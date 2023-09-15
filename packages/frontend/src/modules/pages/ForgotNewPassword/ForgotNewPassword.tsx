import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { initValue, validationSchema } from './const';
import { AuthContainer } from '../../common/components/auth/authContainer/authContainer';
import { ErrorMessageText, Input, Label, SubmitButton, Title } from './ForgotNewPassword.styled';
import { useUserQuery } from '../../hooks/useUserQuery';

const ForgotNewPassword = () => {
  const { forgotNewPassword } = useUserQuery();
  const { tokenPass } = useParams();
  const [error, setError] = useState('');
  const handleSubmit = async (
    values: { password: string; confirmPassword: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    const { data } = await forgotNewPassword.mutateAsync({
      password: values.password,
      token: tokenPass as string
    });
    setError(data.message);

    resetForm();
  };

  return (
    <AuthContainer>
      <Title>Відновлення паролю</Title>
      <Formik initialValues={initValue} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form style={{ textAlign: 'center' }}>
          <Label htmlFor="password">Пароль</Label>
          <Input type="password" name="password" placeholder="Введите новый пароль" />
          <ErrorMessageText name="password" component="div" className="error" />
          <Label htmlFor="confirmPassword">Підтвердіть пароль</Label>
          <Input type="password" name="confirmPassword" placeholder="Подтвердите пароль" />
          <ErrorMessageText name="confirmPassword" component="div" className="error" />
          <SubmitButton type="submit">Зберегти</SubmitButton>
          <p>{error}</p>
        </Form>
      </Formik>
    </AuthContainer>
  );
};

export default ForgotNewPassword;
