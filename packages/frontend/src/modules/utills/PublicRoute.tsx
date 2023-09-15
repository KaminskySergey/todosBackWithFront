import React, { FC, PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { TokenContext } from '../navigation';
import { getAuthTokenFromLocalStorage } from './localStorage';

interface PublicRouteProps {
  component: FC<PropsWithChildren<unknown>>;
  redirectTo?: string;
}

export const PublicRoute = ({ component: Component, redirectTo = '/' }: PublicRouteProps) => {
  const tokenContext = useContext(TokenContext);
  const { token } = tokenContext;
  const currentToken = tokenContext ? token : getAuthTokenFromLocalStorage();
  const isPublic = !currentToken;

  return isPublic ? <Component /> : <Navigate to={redirectTo} />;
};
