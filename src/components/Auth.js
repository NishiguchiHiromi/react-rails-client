import React from 'react';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router-dom';
import PrivateRoute from 'components/routes/PrivateRoute';
import useLogin from '../hooks/useLogin';
import Login from './Login';

const Auth = () => {
  const [{ finishCheckLoggedIn, loginUser }, { login, logout }] = useLogin();

  if (!finishCheckLoggedIn) return null;
  return (
    <Switch>
      <Route path="/login">
        <Login login={({ mail, password }) => login({ mail, password })} />
      </Route>

      {loginUser
        ? (
          <Route path="/">
            <PrivateRoute loginUser={loginUser} logout={() => logout()} />
          </Route>
        )
        : <Redirect to="/login" />}
    </Switch>
  );
};
export default withRouter(Auth);
