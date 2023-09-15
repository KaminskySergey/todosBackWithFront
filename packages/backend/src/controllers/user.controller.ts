import { Response, Request } from 'express';
import UserService from '../services/user.service';
import EmailService from '../services/email.service';
import { User } from '../entities/User';
import { IUser } from '../types/user.types';

export class UserController {
  constructor(private userService: UserService, private emailService: EmailService) {}

  async register(req: Request, res: Response) {
    const newUser = await this.userService.create(req.body);
    this.emailService.sendConfirmationEmail(newUser.email, newUser.token);
    res.send(newUser);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Такого пользователя нет' });
    }

    if (!token) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }
    if (!user.isVerify) {
      return res.status(403).json({ message: 'Ваш аккаунт не верифицирован' });
    }
    res.send({ currentToken: token });
  }

  async activate(req: Request, res: Response) {
    const activatedLink = req.params.link;
    const user = await User.findOne({ where: { token: activatedLink } });
    if (!user) {
      return res.status(404).send('User with this activateLink does not exist');
    }

    await this.userService.activate(activatedLink);
    res.send(user);
  }

  async reset(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await this.userService.requestPasswordReset(email);
      res.send(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { oldPassword, newPassword } = req.body;
    const { token } = req.params;

    if (!oldPassword || !newPassword || !token) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      await this.userService.resetPassword(token, oldPassword, newPassword);
      res.status(200).json({ success: true, message: 'Password successfully changed' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ success: false, message: 'An error occurred' });
    }
  }

  async info(req: Request, res: Response) {
    const { user } = req;
    const infoUser = await this.userService.infoUser(user as IUser);
    res.send(infoUser);
  }

  async recoverReset(req: Request, res: Response) {
    const { email } = req.body;
    await this.userService.recoverPasswordResetEmail(email);
    res.send();
  }

  async recoverNewPassword(req: Request, res: Response) {
    const { password } = req.body;
    const { token } = req.params;
    if (!password || !token) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
      await this.userService.recoverNewPassword(token, password);
      res.status(200).json({ success: true, message: 'Password successfully changed' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ success: false, message: 'An error occurred' });
    }
  }
}

const userController = new UserController(new UserService(), new EmailService());
export default userController;
