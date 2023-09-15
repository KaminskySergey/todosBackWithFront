import React, { useContext, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { AuthContainer } from '../../common/components/auth/authContainer/authContainer';
import { Input, Label, SubmitButton, Title } from './ChangePassword.styled';
import { useUserQuery } from '../../hooks/useUserQuery';
// eslint-disable-next-line import/no-cycle
import { TokenContext } from '../../navigation';
import { initValue, validationSchema } from './const';
import { COLORS } from '../../theme';

const ChangePassword = (): JSX.Element => {
  const { changePasswordMutation } = useUserQuery();
  const { token } = useContext(TokenContext);
  const [error, setError] = useState('');

  const handleSubmit = async (
    values: { currentPassword: string; newPassword: string; token: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (values.currentPassword !== '' && values.newPassword !== '') {
      const { data } = await changePasswordMutation.mutateAsync({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
        token
      });
      setError(data.message);
    }

    resetForm();
  };
  return (
    <AuthContainer>
      <Title>Change Password</Title>
      <Formik initialValues={initValue} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Label>
            Current Password
            <Input type="password" name="currentPassword" as={Input} />
            <ErrorMessage name="currentPassword" component="div" />
          </Label>

          <Label>
            New Password
            <Input type="password" name="newPassword" as={Input} />
            <ErrorMessage name="newPassword" component="div" />
          </Label>

          <Label>
            Confirm New Password
            <Input type="password" name="confirmPassword" as={Input} />
            <ErrorMessage name="confirmPassword" component="div" />
          </Label>
          <SubmitButton type="submit">Change Password</SubmitButton>
          <p style={{ color: `${COLORS.greenColor}` }}>{error}</p>
        </Form>
      </Formik>
    </AuthContainer>
  );
};

export default ChangePassword;
