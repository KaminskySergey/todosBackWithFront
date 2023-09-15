import HttpSerivce from './http';
import { BACKEND_KEYS } from '../modules/common/consts/app-keys.const';
import { IFilterGet, ITodo, TodoState } from '../modules/common/types/student.types';

class TodoService extends HttpSerivce {
  async getTodos(params?: IFilterGet) {
    const queryParams = new URLSearchParams({
    search: params?.search || '',
      status: params?.status || '',
  });
    const page = params?.currentPage;
    const limit = 3;
  const url = `todos?${queryParams}&page=${page}&limit=${limit}`;
    const result = await this.get({ url });
    return result.data;
  }

  async getTodoById(todoId: string) {
    const { data } = await this.get({ url: `${BACKEND_KEYS.TODOS}/${todoId}` });
    return data;
  }

  createTodoForm = async (todo: TodoState) => {
    const { data } = await this.post({
      url: BACKEND_KEYS.TODOS,
      data: todo
    });
    return data;
  };

  async updateTodo(todo: ITodo): Promise<TodoState> {
    const { id, ...data } = todo;
    const result = await this.put({
      url: `${BACKEND_KEYS.TODOS}/${id}`,
      data
    });
    return result.data;
  }

  async deleteTodo(todoId: string) {
    return this.delete(
      {
        url: `${BACKEND_KEYS.TODOS}/${todoId}`
      },
      true
    );
  }
}

const todoService = new TodoService();

export default todoService;
