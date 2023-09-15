/* eslint-disable import/no-cycle */
import React, { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../common/components/layout/Layout';
import Todo from '../pages/Todo/Todo';
import TodoDetails from '../pages/TodoDetails/TodoDetails';
import Login from '../pages/Login/Login';
import { getAuthTokenFromLocalStorage } from '../utills/localStorage';
import Register from '../pages/Register/Register';
import Activate from '../pages/Activate/Activate';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import { PrivateRoute } from '../utills/PrivateRoute';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ForgotNewPassword from '../pages/ForgotNewPassword/ForgotNewPassword';
import Home from '../pages/Home/Home';

interface IContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const TokenContext = createContext<IContext>({ token: '', setToken: () => '' });

export const MainRouter = () => {
  const [token, setToken] = useState(getAuthTokenFromLocalStorage() || '');

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <TokenContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todo />} />
          <Route path="/todos/:todoId" element={<TodoDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate/:link" element={<Activate />} />
          <Route
            path="/changePassword"
            element={<PrivateRoute component={ChangePassword} redirectTo="/login" />}
          />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/recoverPassword/:tokenPass" element={<ForgotNewPassword />} />
        </Route>
      </Routes>
    </TokenContext.Provider>
  );
};
