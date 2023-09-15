import nodemailer from 'nodemailer';

export default class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
      }
    });
  }

  async sendConfirmationEmail(toEmail: string, token: string): Promise<void> {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: toEmail,
      subject: 'Подтверждение регистрации',
      html: `<a target="_blank" href="${process.env.CLIENT_URL}/activate/${token}">Підтвердити email</a>`
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(toEmail: string): Promise<void> {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: toEmail,
      subject: 'Сброс пароля',
      html: `<a target="_blank" href="${process.env.CLIENT_URL}/changePassword">Сбросить пароль</a>`
    };

    await this.transporter.sendMail(mailOptions);
  }

  async resetRecoverByEmail(toEmail: string, resetLink: string): Promise<void> {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: toEmail,
      subject: 'Восстановить пароль',
      html: `<a target="_blank" href="${resetLink}">Восстановить пароль</a>`
    };

    await this.transporter.sendMail(mailOptions);
  }
}
