// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi';

export const todoSchema = Joi.object({
  id: Joi.string().uuid(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  isPrivate: Joi.boolean().strict().required(),
  isCompleted: Joi.boolean().strict().required(),
  user: Joi.string().uuid()

});

export const updateTodoSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  isPrivate: Joi.boolean().strict(),
  isCompleted: Joi.boolean().strict(),
  createdAt: Joi.date().iso(),
  user: Joi.string().uuid()
});

export const userSchema = {
  userSchemaRegister: Joi.object({
    id: Joi.string().uuid(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    todos: Joi.array().items(Joi.object()),
    isVerify: Joi.boolean(),
    verifyToken: Joi.string().allow(null),
    token: Joi.string().allow(null)
  }),
  resetPasword: Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required()
  }),
  reset: Joi.object({
    email: Joi.string().required()
  }),
  activate: Joi.object({
    email: Joi.string().email().required()
  }),
  recoverPassword: Joi.object({
    password: Joi.string().required()
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
};
