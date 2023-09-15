import HttpSerivce from './http';
import { BACKEND_KEYS } from '../modules/common/consts/app-keys.const';
import { UserState } from '../modules/common/types/student.types';

class UserService extends HttpSerivce {
  async login(email: string, password: string) {
    const result = await this.post({
      url: `${BACKEND_KEYS.USER}/login`,
      data: { email, password }
    });
    return result.data;
  }

  async register(user: UserState) {
    const { data } = await this.post({
      url: `${BACKEND_KEYS.USER}/register`,
      data: user
    });
    return data;
  }

  async activate(activate: string) {
    const res = await this.get({ url: `${BACKEND_KEYS.USER}/activate/${activate}` });
    return res.data;
  }

  async reset(email: string) {
    const res = await this.post({ url: `${BACKEND_KEYS.USER}/reset`, data: { email } });
    return res;
  }

  async changePassword(oldPassword: string, newPassword: string, token: string) {
    const tokenWithoutBearer = token.split(' ')[1];
    const res = await this.put({
      url: `${BACKEND_KEYS.USER}/reset-password/${tokenWithoutBearer}`,
      data: { oldPassword, newPassword }
    });
    return res;
  }

  async forgotEmail(email: string) {
    const res = await this.post({
      url: `${BACKEND_KEYS.USER}/forgot`,
      data: { email }
    });
    return res;
  }

  async forgotNewPassword(password: string, token: string) {
    const res = await this.post({
      url: `${BACKEND_KEYS.USER}/forgot/${token}`,
      data: { password }
    });
    return res;
  }

  userInfo = async () => {
    const res = await this.get({
      url: `${BACKEND_KEYS.USER}/info`
    });
    return res.data;
  };
}

const userService = new UserService();

export default userService;
