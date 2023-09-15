/* eslint-disable prettier/prettier */
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ITodo, PaginationInfo, UserState } from '../../../types/student.types';

export interface TodoTabletProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  todos: ITodo[];
  mutation: (id: string) => void;
  updateTodoComplited: (id: string, isCompleted: boolean) => void;
  user?: UserState;
  isFetching: boolean;
  setCurrentPage: (page: number) => void;
  page: number;
  pagination: PaginationInfo | undefined;
  status: string;
  search: string;
}
