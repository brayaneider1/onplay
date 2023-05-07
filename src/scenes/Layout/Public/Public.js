import * as React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from '../../Auth/Login/Login';
import { PasswordRecovery } from '../../Auth/PasswordRecovery/PasswordRecovery';
import { Register } from '../../Auth/Register/Register';
import { Request } from '../../Request/Request';

export const Public = () => {
  return (
    <Router>
      <Switch className="h-100">
        <Route exact path="/" component={Login} />
        <Route exact path="/registro/:token" component={Register} />
        <Route exact path="/request" component={Request} />
        <Route exact path="/password" component={PasswordRecovery} />
      </Switch>
    </Router>
  );
};
