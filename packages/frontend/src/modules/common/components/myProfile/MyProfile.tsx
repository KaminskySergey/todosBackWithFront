import React, { useState } from 'react';
import { useUserQuery } from '../../../hooks/useUserQuery';
import { ChangePasswordButton, Message, UserInfo, UserModalContainer } from './MyProfile.styled';

const MyProfile = (): JSX.Element => {
  const userService = useUserQuery();
  const [message, setMessage] = useState('');
  const { data: user, isLoading, isError } = userService.userInfoQuery;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  const handleChange = async () => {
    try {
      const res = await userService.resetPasswordMutation.mutateAsync(user?.email);
      setMessage(res.data.message);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <UserModalContainer>
      <UserInfo>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </UserInfo>
      <ChangePasswordButton type="button" onClick={handleChange}>
        Change password
      </ChangePasswordButton>
      <Message>{message}</Message>
    </UserModalContainer>

  );
};

export default MyProfile;
