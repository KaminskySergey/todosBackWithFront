/* eslint-disable import/no-named-as-default */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import todoService from '../../service/todoService';

export function useTodoQuery() {
  const client = useQueryClient();

  const { todoId } = useParams();

  const getTodoById = useQuery(['todo', todoId], () => todoService.getTodoById(todoId as string), {
    refetchOnMount: true
  });

  const updateTodoPrivate = useMutation(
    (isPrivate: boolean) => todoService.updateTodo({ ...getTodoById.data, isPrivate }),
    {
      onSuccess: () => {
        client.invalidateQueries(['todo', todoId]);
      }

    }
  );

  const updateTodoCompleted = useMutation(
    (isCompleted: boolean) => todoService.updateTodo({ ...getTodoById.data, isCompleted }),
    {
      onSuccess: () => {
        client.invalidateQueries(['todo', todoId]);
      }
    }
  );

  return {
    getTodoById,
    updateTodoPrivate,
    updateTodoCompleted
  };
}
