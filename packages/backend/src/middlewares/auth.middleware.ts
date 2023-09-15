import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/user.types';

const unauthorized = (res: Response) => {
  res.status(401).send('Unauthorized');
};
export const AuthMiddlware = (options: { allow?: boolean } = {}) => {
  const { allow = false } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: IUser) => {
      if (!allow && (err || !user)) {
        return unauthorized(res);
      }

      if (user) {
        req.user = user;
      }

      next();
    })(req, res, next);
  };
};

export const VerifyMiddlware = (options: { allow?: boolean } = {}) => {
  const { allow = false } = options;

  return (req: Request, res: Response, next: NextFunction) => {
  const isActivationRequest = req.originalUrl.startsWith('/api/user/activate/');

    if (isActivationRequest && allow) {
      return next();
    }

    passport.authenticate('jwt', { session: false }, (err: Error, user: IUser) => {
      if (!allow && (err || !user)) {
        return unauthorized(res);
      }

      if (user) {
        req.body = { user, ...req.body };
      }

      next();
    })(req, res, next);
  };
};
