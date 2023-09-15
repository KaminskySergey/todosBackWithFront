import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { catchAsync } from '../../middlewares/middlewares';
import validator from '../../validator/validator';
import { Todo } from '../../entities/Todo';
import { todoSchema, updateTodoSchema } from '../../validator/schema.validators';
import { AuthMiddlware } from '../../middlewares/auth.middleware';

const todosRouter: Router = Router();

todosRouter.get(
  '',
  AuthMiddlware({ allow: true }),
  catchAsync(todoController.getAllTodo.bind(todoController))
);
todosRouter.get(
  '/:id',
  AuthMiddlware({ allow: true }),
  validator.isExist(Todo),
  catchAsync(todoController.getTodoById.bind(todoController))
);
todosRouter.post(
  '',
  AuthMiddlware({ allow: false }),
  validator.isBody(todoSchema),
  catchAsync(todoController.createTodo.bind(todoController))

);
todosRouter.post('', validator.isBody(todoSchema), catchAsync(todoController.createTodo.bind(todoController)));
todosRouter.delete(
  '/:id',
  AuthMiddlware(),
  validator.isExist(Todo),
  catchAsync(todoController.deleteTodoById.bind(todoController))
);
todosRouter.put(
  '/:id',
  AuthMiddlware(),
  validator.isExist(Todo),
  validator.isBody(updateTodoSchema),
  catchAsync(todoController.updateTodo.bind(todoController))

);

export default todosRouter;
