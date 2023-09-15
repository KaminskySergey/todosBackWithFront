// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../entities/User';
import EmailService from './email.service';
import { IUser } from '../types/user.types';

export default class UserService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async create(user: IUser): Promise<User> {
    try {
      const { password, ...restUserData } = user;
      const candidate = await User.findOne({ where: { email: user.email } });
      if (candidate) {
        throw new Error('Такой пользователь существует');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User();
      const token = jwt.sign({ userId: newUser.id, email: user.email }, process.env.JWT_SECRET);
      newUser.email = restUserData.email;
      newUser.name = restUserData.name;
      newUser.password = hashedPassword;
      newUser.token = token;
      newUser.isVerify = false;
      await newUser.save();

      await this.emailService.sendConfirmationEmail(
        newUser.email,
        `${process.env.SERVER_URL}/activate/${token}`
      );

      return newUser;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  }

  async login(email: string, password: string): Promise<string | null> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      user.token = token;
      await user.save();
      return `Bearer ${token}`;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error logging in user:', error);
      throw new Error('Ошибка входа');
    }
  }

  async activate(token: string): Promise<any> {
    const user = await User.findOne({ where: { token } });

    if (!user) {
      throw new Error('User with this activateLink does not exist');
    }
    await User.update(user.id, { isVerify: true });
  }

  async requestPasswordReset(email: string) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('Пользователь с таким email не найден');
      }

      await this.emailService.sendPasswordResetEmail(email);

      return { message: 'Письмо с инструкциями отправлено на ваш email' };
    } catch (error) {
      throw new Error('Не получилось');
    }
  }

  async resetPassword(
    token: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void | { message: string }> {
    try {
      // Найдите пользователя по email
      const user = await User.findOne({ where: { token } });
      if (!user) {
        throw new Error('Пользователь с таким email не найден');
      }

      // Проверяем, совпадает ли старый пароль
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new Error('Старый пароль неверен');
      }

      // Установите новый пароль
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return { message: 'Пароль успешно изменен' };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return { message: 'Произошла ошибка' };
    }
  }

    async infoUser(user: IUser) {
   const currentUser = await User.findOne({ where: { id: user.id } });
    if (!currentUser) {
      return { message: 'Такого користувача не існує' };
    }
  }

  async recoverPasswordResetEmail(email: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Пользователь с таким email не найден');
    }

    // Генерируем токен сброса пароля
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Формируем ссылку для сброса пароля
    const resetLink = `${process.env.CLIENT_URL}/recoverPassword/${token}`;

    await this.emailService.resetRecoverByEmail(email, resetLink);
    return { message: 'Письмо для сброса пароля отправлено на вашу почту.' };
  }

  async recoverNewPassword(token: string, newPassword: string) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

      const { email } = decodedToken;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Пользователь с таким токеном не найден');
      }
      if (!user) {
        throw new Error('Пользователь с таким email не найден');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return { message: 'Пароль установлен' };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw new Error('Произошла ошибка при сбросе пароля.');
    }
  }
}
