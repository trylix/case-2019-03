import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAccount } from '../../hooks';

export interface Props extends RouteProps {
  protect?: boolean;
}

export const PermissionRoute: React.FC<Props> = ({ protect, ...rest }) => {
  const { isAuthenticated } = useAccount();

  if (!isAuthenticated && protect) return <Redirect to="/" />;

  if (isAuthenticated && !protect) return <Redirect to="/prescriptions" />;

  return <Route {...rest} />;
};
