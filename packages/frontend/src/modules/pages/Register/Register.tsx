import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Form, Formik, useFormik } from 'formik';
import { UserValidSchema, initValueForm } from './const';
import { AuthContainer } from '../../common/components/auth/authContainer/authContainer';

import { ADRESS } from '../../common/consts/app-keys.const';
import { Button, ErrorMessage, Input, Label, LinkChange, LinkForgot, Text, Title } from './Register.styled';
import { useUserQuery } from '../../hooks/useUserQuery';
import { UserState } from '../../common/types/student.types';
import { WarningActivated } from '../Login/Login.styled';

const Register = () => {
  const navigate = useNavigate();
  const { registerMutation } = useUserQuery();
  const [error, setError] = useState('');
  const handleFormSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      await registerMutation.mutateAsync(values as UserState);
      navigate('/login');
      setError('Все пройшло успішно');
    } catch (err) {
      setError('Щось пшло не так, можлио не правильн дані');
      // eslint-disable-next-line no-console
      console.error('Failed to login:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: UserValidSchema,
    onSubmit: handleFormSubmit
  });

  return (
    <AuthContainer>
      <Title>Register</Title>
      <Formik initialValues={initValueForm} onSubmit={handleFormSubmit}>
        <Form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
          }}
        >
          <Label>
            <Input
              name="name"
              type="text"
              placeholder="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
          </Label>
          {formik.errors && formik.touched.name && (
            <ErrorMessage>{formik.errors.name}</ErrorMessage>
          )}
          <Label>
            <Input
              name="email"
              type="email"
              placeholder="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
          </Label>
          {formik.errors && formik.touched.email && (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          )}
          <Label>
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
          </Label>
          {formik.errors && formik.touched.password && (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          )}
          <Button type="submit">Create</Button>
        </Form>
      </Formik>
      <Text>
        {' '}
        Dont have an account? <LinkChange to={`/${ADRESS.LOGIN}`}>Login</LinkChange>
      </Text>
      <Text>
        <LinkForgot to="/forgotPassword">forgot password?</LinkForgot>
      </Text>
      {error ? (
        <WarningActivated>
          <p>{error}</p>
        </WarningActivated>
      ) : null}
    </AuthContainer>
  );
};

export default Register;
