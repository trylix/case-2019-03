import React, { Fragment } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAccount } from '../../hooks';
import { Auth, Platform } from '../../layouts';

export interface Props extends RouteProps {
  protect?: boolean;
}

export const PermissionRoute: React.FC<Props> = ({ protect, ...rest }) => {
  const { isAuthenticated } = useAccount();

  if (!isAuthenticated && protect) return <Redirect to="/" />;

  if (isAuthenticated && !protect) return <Redirect to="/prescriptions" />;

  const Layout = protect ? Platform : Auth;

  return (
    <Layout>
      <Route {...rest} />
    </Layout>
  );
};
