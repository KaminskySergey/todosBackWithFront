import { DetailedHTMLProps, TableHTMLAttributes } from 'react';
import { ITodo, UserState } from '../../../types/student.types';

export interface TodoDesktopProps
  extends DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  todos: ITodo[];
  mutation: (id: string) => void;
  updateTodoComplited: (id: string, isCompleted: boolean) => void;
  user?: UserState;
  isFetching: boolean;
}
