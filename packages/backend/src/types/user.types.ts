import { ITodo } from './todos.type';

export interface IUser {
  id?: string;
  email: string;
  name: string;
  password: string;
  todos: ITodo[];
  isVerify: boolean;
  verifyToken: string;
  token: string;
}
