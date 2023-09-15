import { DeepPartial } from 'typeorm';
import { Todo } from '../entities/Todo';
import { ITodo } from '../types/todos.type';

interface PaginationInfo {
totalCount: number,
        totalPages: number,
        currentPage: number,
        pageSize: number,
        remaining: number,
}

export default class TodoService {
  // eslint-disable-next-line max-len
  async findAll(userId: string | undefined, search: string | undefined, status: string | undefined, page: number, limit: number): Promise<{ data: Todo[], pagination: PaginationInfo }> {
    const queryBuilder = await Todo.createQueryBuilder('todo');
    if (userId) {
      queryBuilder.where('todo.user = :userId', { userId });
    } else {
      queryBuilder.where('todo.isPrivate = false');
    }

    if (search) {
      queryBuilder.andWhere('todo.title ILIKE :search', { search: `%${search}%` });
    }
    if (status) {
      if (status === 'Private') {
        queryBuilder.andWhere('todo.isPrivate = :isPrivate', { isPrivate: true });
      } else if (status === 'Public') {
        queryBuilder.andWhere('todo.isPrivate = :isPrivate', { isPrivate: false });
      } else if (status === 'Completed') {
        queryBuilder.andWhere('todo.isCompleted = :isCompleted', { isCompleted: true });
      }
    }
    const skip = (page - 1) * limit;
    const [data, totalCount] = await queryBuilder
      .orderBy('todo.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = page;
    const remaining = totalCount - (page - 1) * limit;

    return {
      data,
      pagination: {
        totalCount,
        totalPages,
        currentPage,
        pageSize: limit,
        remaining,
      },

    };
  }

  async create(todo: ITodo): Promise<Todo> {
    const item = await Todo.save(todo as DeepPartial<Todo>);
    return item;
  }

  async findOne(id: string): Promise<Todo | null> {
    const item = await Todo.findOne({ where: { id } });
    return item;
  }

  async delete(id: string): Promise<{ success: string }> {
    await Todo.findOne({ where: { id } });

    await Todo.delete(id);
    return { success: 'Todo deleted successfully' };
  }

  async update(id: string, newTodo: ITodo): Promise<Todo | null> {
    await Todo.update(id, newTodo as DeepPartial<Todo>);
    const updateTodo = await Todo.findOne({ where: { id } });
    return updateTodo;
  }
}
