import { message as sendNotif } from 'antd';
import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

export interface IAccountUser {
  id: string;
  name: string;
  email: string;
  role: "doctor" | "patient";
  createdAt: number;
  updatedAt: number;
}

export interface IAccountData {
  accessToken: string;
  accountUser: IAccountUser;
}

export interface IAccountContext {
  loadingAccount: boolean;
  isAuthenticated: boolean;
  accountData: IAccountData | null;
  handleLogin: (submitted: any) => Promise<void>;
  handleLogout: () => void;
}

const AccountContext = createContext<IAccountContext>({} as IAccountContext);

export const AccountProvider: React.FC = ({ children }) => {
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [accountData, setAccountData] = useState<IAccountData | null>(() => {
    const storageAccessToken = localStorage.getItem("@vitta:accessToken");
    const storageAccountUser = localStorage.getItem("@vitta:account");

    if (storageAccessToken && storageAccountUser) {
      api.defaults.headers.authorization = `Bearer ${storageAccessToken}`;

      return {
        accessToken: storageAccessToken,
        accountUser: JSON.parse(storageAccountUser),
      };
    }

    return null;
  });

  const history = useHistory();

  const handleLogin = async (submitted: any) => {
    setLoadingAccount(true);

    const {
      status,
      data: { accessToken, message },
    } = await api.post("/auth/login", submitted);

    if (status === 201) {
      api.defaults.headers.authorization = `Bearer ${accessToken}`;

      const { status: loggedStatus, data: loggedData } = await api.get(
        "/auth/logged"
      );

      if (loggedStatus === 200) {
        localStorage.setItem("@vitta:accessToken", accessToken);
        localStorage.setItem("@vitta:account", JSON.stringify(loggedData));

        setAccountData({
          accessToken,
          ...loggedData,
        });

        history.push("/prescriptions");
      } else {
        delete api.defaults.headers.authorization;
      }
    }

    if (message) {
      void sendNotif.error(message);
    }

    setLoadingAccount(false);
  };

  const handleLogout = () => {
    delete api.defaults.headers.authorization;
    localStorage.clear();
    setAccountData(null);
  };

  return (
    <AccountContext.Provider
      value={{
        loadingAccount,
        accountData,
        isAuthenticated: Boolean(accountData?.accountUser),
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
