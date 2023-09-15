import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { catchAsync } from '../middlewares/middlewares';

class Validator {
  isBody(schema: ObjectSchema<any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validateAsync(req.body);
        next();
      } catch (error) {
        return res.status(400).json({ error: error instanceof Error ? error.message : error });
      }
    };
  }

    isExist(entityModel: any) {
      return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const entity = await entityModel.findOneById({ id });
      if (!entity) {
        res.status(400).json({ error: 'Entity not found' });
        return;
      }
      next();
    });
  }
}

const validator = new Validator();
export default validator;
