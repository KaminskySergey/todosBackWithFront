import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { AuthContainer } from '../../common/components/auth/authContainer/authContainer';
import { initValue, validationSchema } from './const';
import { Input, Label, Title } from '../Login/Login.styled';
import userService from '../../../service/userService';
import { Button, ErrorMess, ErrorText } from './ForgotPassword.styled';

const ForgotPassword = () => {
  const [error, setError] = useState('');
  const handleSubmit = async (
    values: { email: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const res = await userService.forgotEmail(values.email);
      if (res.status === 200) {
        setError('Інструкція на пошті');
      } else {
        setError('Помилка під час надсилання інструкції');
      }
      resetForm();
    } catch (err) {
      setError('Помилка під час відправлення запиту');
    }
  };

  return (
    <AuthContainer>
      <Title>Відновлення паролю</Title>
      <Formik initialValues={initValue} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Label>
              <Input type="email" name="email" placeholder="Введіть пошту" />
              <ErrorMess name="email" component="div" className="error" />
            </Label>
            <div>
              <Button type="submit" disabled={isSubmitting}>
                Відправити інструкцію
              </Button>
            </div>
            <ErrorText>{error}</ErrorText>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
};

export default ForgotPassword;
