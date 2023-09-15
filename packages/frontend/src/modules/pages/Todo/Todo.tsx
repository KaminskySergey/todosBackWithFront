/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import React, { useContext, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMediaQuery } from 'react-responsive';
import { useSearchParams } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import Sort from '../../common/components/sort/Sort';

import { ITodo, TodoState, UserState } from '../../common/types/student.types';

import TodoTablet from '../../common/components/todo/TodoTablet/TodoTablet';
import TodoMobile from '../../common/components/todo/TodoMobile/TodoMobile';
import TodoDesktop from '../../common/components/todo/TodoDesktop/TodoDesktop';
import Button from '../../common/components/button/BtnSort/Button';
import Modal from '../../common/components/modal/Modal';
import CreateTodo from '../../common/components/form/create-todo/CreateTodo';
import { ButtonContainer } from './Todo.styled';
import todoService from '../../../service/todoService';
import userService from '../../../service/userService';
// eslint-disable-next-line import/no-cycle
import { TokenContext } from '../../navigation';
import { StatusType } from '../../common/components/sort/Sort.props';
import BasicPagination from '../../common/components/pagination/Pagination';

function Todo() {
  const { token } = useContext(TokenContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';

  const [filter, setFilter] = useState('All');
  // eslint-disable-next-line no-console
  console.log(filter);
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, isError, data, isFetching } = useQuery<TodoState>({
    refetchOnMount: true,
    queryKey: ['todos', search, status, currentPage],
    queryFn: () => todoService.getTodos({ search, status, currentPage })
  });

  const todos = data?.data || [];
  const pagination = data?.pagination;

  const { data: user } = useQuery<UserState>({
    refetchOnMount: true,
    queryKey: ['user'],
    queryFn: () => (token.length !== 0 ? userService.userInfo() : Promise.resolve(null))
  });

  const [isOpen, setIsOpen] = useState(false);
  const client = useQueryClient();
  const mutation = useMutation((id: string) => todoService.deleteTodo(id), {
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] });
    }

  });

  const handleCHange = (page: number) => {
    setCurrentPage(page);
  };

const handleFilterChange = (selectedFilter: string) => {
  setFilter(selectedFilter);
};

  function updateTodoComplited(todoId: string, isCompleted: boolean) {
    const updatedTodo = todos?.find((todo: ITodo) => todo.id === todoId);
    if (updatedTodo) {
      updatedTodo.isCompleted = isCompleted;
      todoService
        .updateTodo(updatedTodo)

        .then(() => {
          client.invalidateQueries(['todos']);
        })
        .catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error('Error updating todo:', error);
        });
    }
  }

  const handleClearFilters = () => {
    setSearchParams({ search: '', status: '' });
  };

  const isMobile = useMediaQuery({ maxWidth: 425 });
  const isTablet = useMediaQuery({ minWidth: 425, maxWidth: 768 });
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const handleToggle = () => {
    setIsOpen((pS) => !pS);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: З вашим запитом щось не так</span>;
  }
  if (!pagination) {
    return;
}
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '550px', justifyContent: 'spaceBetween' }}>
      <Sort
        onFilterChange={handleFilterChange}
        setSearchParams={setSearchParams}
        search={search}
        status={status as StatusType}
        handleClearFilters={handleClearFilters}
      />

      {user && isMobile && (

        <ButtonContainer>
          <Button color="green" onClick={handleToggle}>
            Create ToDo +
          </Button>
        </ButtonContainer>
      )}
      {isMobile && (
        <TodoMobile
          user={user}
          todos={todos}
          mutation={mutation.mutate}
          updateTodoComplited={updateTodoComplited}
          isFetching={isFetching}
        />
      )}
      {isTablet && (
        <TodoTablet
          user={user}
          todos={todos}
          mutation={mutation.mutate}
          updateTodoComplited={updateTodoComplited}
          isFetching={isFetching}
          setCurrentPage={setCurrentPage}
          page={currentPage}
          pagination={pagination}
          status={status}
          search={search}
        />
      )}
      {isDesktop && (
        <TodoDesktop
          user={user}
          todos={todos}
          mutation={mutation.mutate}
          updateTodoComplited={updateTodoComplited}
          isFetching={isFetching}
        />
      )}

      {user && !isMobile && (

      <ButtonContainer>
        <Button color="green" onClick={handleToggle}>
          Create ToDo +
        </Button>
      </ButtonContainer>
      )}

      {todos.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <p style={{ marginBottom: '24px' }}>Список задач порожній</p>
        </div>
) : (
  !isTablet && (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
      <BasicPagination pagination={pagination} handleChange={handleCHange} />
    </div>
  )
  )}

      {isOpen && (
        <Modal onClose={handleToggle}>
          <CreateTodo onClose={handleToggle} />
        </Modal>
      )}
    </div>
  );
}

export default Todo;
