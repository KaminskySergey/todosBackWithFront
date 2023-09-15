/* eslint-disable import/no-extraneous-dependencies */
import bodyParser from 'body-parser';
import express, { NextFunction } from 'express';
import cors from 'cors';

import passport from 'passport';

import 'dotenv/config';

import AppRouter from './routes';
import connectDB from './config/database';
import { jwtStrategy } from './config/passport';
// import { jwtStrategy } from './config/passport';

const app = express();
const router = new AppRouter(app);
// Connect to MongoDB
connectDB();

// Middleware для проверки аутентификации пользователя с использованием JWT
export const authenticateJwt = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('jwt', { session: false })(req, res, next);

// Express configuration
app.set('port', process.env.PORT || 4200);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
passport.initialize();
passport.use(jwtStrategy);

router.init();

const port = app.get('port');
// eslint-disable-next-line no-console
const server = app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`)
);

export default server;
