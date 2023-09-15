/* eslint-disable import/no-named-as-default */
import { useMutation, useQuery } from '@tanstack/react-query';
import userService from '../../service/userService';
import { UserState } from '../common/types/student.types';

export function useUserQuery() {
  const loginMutation = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      userService.login(email, password),
    {}
  );

  const registerMutation = useMutation((user: UserState) => userService.register(user), {});

  const activate = useMutation((activateLink: string) => userService.activate(activateLink), {});

  const resetPasswordMutation = useMutation((email: string) => userService.reset(email), {});

  const changePasswordMutation = useMutation(
    ({
      oldPassword,
      newPassword,
      token
    }: {
      oldPassword: string;
      newPassword: string;
      token: string;
    }) => userService.changePassword(oldPassword, newPassword, token),
    {}
  );
  const userInfoQuery = useQuery(['userInfo'], userService.userInfo, {});

  const forgotEmail = useMutation((email: string) => userService.forgotEmail(email), {});

  const forgotNewPassword = useMutation(
    ({ password, token }: { password: string; token: string }) =>
      userService.forgotNewPassword(password, token)
  );

  return {
    loginMutation,
    registerMutation,
    activate,
    resetPasswordMutation,
    changePasswordMutation,
    userInfoQuery,
    forgotEmail,
    forgotNewPassword
  };
}
