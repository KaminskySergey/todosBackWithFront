// TODO: Put a real interfaces here
export interface ITodo {
  id?: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isCompleted?: boolean;
  user: string;
}

export interface ITodoParams {
  status?: string | null;
  search?: string | null;
}
