import { Response, Request } from 'express';
// eslint-disable-next-line import/no-named-as-default, import/no-cycle
import TodoService from '../services/todo.service';
import { IUser } from '../types/user.types';

interface IFilter {
  search ?: string;
  status?: string;
}

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request, res: Response) {
    const userId = (req.user as any)?.id;
    const { search, status } = req.query as IFilter;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

  const todos = await this.todoService.findAll(userId, search, status, page, limit);
  res.send(todos);
  }

  async createTodo(req: Request, res: Response) {
    const { id } = req.user as IUser;
    const newTodo = await this.todoService.create({ ...req.body, user: id });
    res.send(newTodo);
  }

  async getTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.findOne(id);
    res.send(todo);
  }

  async deleteTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.delete(id);
    res.send(todo);
  }

  async updateTodo(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.update(id, req.body);
    res.send(todo);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
