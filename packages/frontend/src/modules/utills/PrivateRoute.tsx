import React, { FC, PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { TokenContext } from '../navigation';
import { getAuthTokenFromLocalStorage } from './localStorage';

interface PrivateRouteProps {
  component: FC<PropsWithChildren<unknown>>;
  redirectTo?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  redirectTo = '/'
}) => {
  const tokenContext = useContext(TokenContext);
  const { token } = tokenContext;
  const currentToken = tokenContext ? token : getAuthTokenFromLocalStorage();
  const isPrivate = !currentToken;

  return isPrivate ? <Navigate to={redirectTo} /> : <Component />;
};
