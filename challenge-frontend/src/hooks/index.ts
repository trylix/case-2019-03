import { useContext } from 'react';

import AccountContext, { IAccountContext } from '../providers/account';

export const useAccount = (): IAccountContext => {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider.");
  }

  return context;
};
