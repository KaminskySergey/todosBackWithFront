/* eslint-disable import/no-cycle */
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Form, Formik, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../navigation';
import { Button, Input, Label, LinkChange, Text, Title, WarningActivated } from './Login.styled';
import { AuthContainer } from '../../common/components/auth/authContainer/authContainer';
import userService from '../../../service/userService';
import { setAuthTokenAndContext } from '../../utills/localStorage';
import { ADRESS } from '../../common/consts/app-keys.const';
import { initValueForm } from './const';
import { ErrorMessage } from '../Register/Register.styled';

export const UserValidSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required')
});
type ILogin = {
  email: string;
  password: string;
};

const Login = () => {
  const navigation = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [error, setError] = useState('');
  const mutation = useMutation(
    ({ email, password }: ILogin) => userService.login(email, password),
    {
      onSuccess: (data) => {
        const bearer = data.currentToken as string;
        setAuthTokenAndContext(bearer, setToken);
      }
    }
  );

  const handleFormSubmit = async (values: ILogin) => {
    try {
      await mutation.mutateAsync(values);
      navigation('/todos');
    } catch (err: unknown) {
      setError('Щось пышло не так. Або неправильні дані або не активований користувач');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: UserValidSchema,
    onSubmit: handleFormSubmit
  });

  return (
    <AuthContainer>
      <p style={{ fontSize: '10px', textAlign: 'center', color: 'red', marginBottom: '16px' }}>
        Якщо ви тільки зареєструвались, то перейдіть на пошту та підтвердіть аккаунт*
      </p>

      <Title>Login</Title>
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
          <Button type="submit">Login</Button>
        </Form>
      </Formik>
      <Text>
        {' '}
        Dont have an account? <LinkChange to={`/${ADRESS.REGISTER}`}>Register</LinkChange>
      </Text>
      {error ? (
        <WarningActivated>
          <p>{error}</p>
        </WarningActivated>
      ) : null}
    </AuthContainer>
  );
};

export default Login;
