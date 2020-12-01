import React from 'react';

import { AccountProvider } from './account';

const AppProvider: React.FC = ({ children }) => {
  return <AccountProvider>{children}</AccountProvider>;
};

export default AppProvider;
