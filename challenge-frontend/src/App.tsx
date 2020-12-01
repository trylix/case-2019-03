import 'antd/dist/antd.css';

import React from 'react';
import { Switch } from 'react-router-dom';

import { PermissionRoute } from './components';
import { Login } from './pages/Login';
import { Prescriptions } from './pages/Prescriptions';
import AppProvider from './providers';

function App() {
  return (
    <AppProvider>
      <Switch>
        <PermissionRoute path="/" component={Login} exact />
        <PermissionRoute
          path="/prescriptions"
          component={Prescriptions}
          exact
          protect
        />
      </Switch>
    </AppProvider>
  );
}

export default App;
