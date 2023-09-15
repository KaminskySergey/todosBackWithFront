import React, { useContext } from 'react';

import { useParams } from 'react-router-dom';
import { ContDescription, ContPosition, Todo } from './TodoDetails.styled';
import SliderButtonPrivate from '../../common/components/button/BtnSlider/SliderButtonPrivate';
import SliderButtonCompleted from '../../common/components/button/BtnSlider/SliderButton';
import { useTodoQuery } from '../../hooks/useTodoQuery';
// eslint-disable-next-line import/no-cycle
import { TokenContext } from '../../navigation';

const TodoDetails = (): JSX.Element => {
  const { todoId } = useParams();
  const { token } = useContext(TokenContext);

  if (!todoId) {
    return <div>Todo ID не найден</div>;
  }
  const { getTodoById, updateTodoPrivate, updateTodoCompleted } = useTodoQuery();

  if (getTodoById.isLoading) {
    return <span>Loading...</span>;
  }

  if (getTodoById.isError) {
    return <span>Error: isError</span>;
  }
  const todo = getTodoById.data;
  return (
    <Todo>
      <div>
        <h2>Title: {todo.title}</h2>
      </div>

      <ContDescription>
        <h3>Description:</h3>
        <p>{todo.description}</p>
      </ContDescription>

      {token ? (
        <div>
          <ContPosition style={{ marginBottom: '16px' }}>
            <p>Completed</p>
            <SliderButtonCompleted
              isCompleted={todo.isCompleted}
              onClick={() => {
                updateTodoCompleted.mutate(!todo.isCompleted);
              }}
            />
          </ContPosition>
          <ContPosition>
            <p>Private</p>
            <SliderButtonPrivate
              onClick={() => {
                updateTodoPrivate.mutate(!todo.isPrivate);
              }}
              isPrivate={todo.isPrivate}
            />
          </ContPosition>
        </div>
      ) : (
        <h3>Дана інформація недоступна для неавторизованого користувача</h3>
      )}
    </Todo>
  );
};

export default TodoDetails;
