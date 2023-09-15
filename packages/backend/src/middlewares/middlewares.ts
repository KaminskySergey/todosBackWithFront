import { Response, Request, NextFunction } from 'express';

export const catchAsync =
  (
    handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Что-то пошло не так!' });
      }
    }
  };
