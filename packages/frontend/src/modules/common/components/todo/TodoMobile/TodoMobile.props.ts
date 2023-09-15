import { HTMLAttributes, DetailedHTMLProps } from 'react';
import { ITodo, UserState } from '../../../types/student.types';

export interface TodoMobileProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  todos: ITodo[];
  mutation: (id: string) => void;
  updateTodoComplited: (id: string, isCompleted: boolean) => void;
  user?: UserState;
  isFetching: boolean;
}
