import React from 'react';
import {
  Link, Redirect, Route, Switch, withRouter,
} from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import Layout from './Layout';
import Login from './Login';
import Mypage from './Mypage';
import User from './User';

const Auth = () => {
  const [{ finishCheckLoggedIn, loginUser }, { login, logout }] = useLogin();

  if (!finishCheckLoggedIn) return null;
  return (
    <Switch>
      <Route path="/login">
        <Login login={({ mail, password }) => login({ mail, password })} />
        <Link to="/public">Public Page</Link>
      </Route>

      {loginUser
        ? (
          <Route path="/">
            <Layout loginUser={loginUser} logout={() => logout()}>
              <Switch>
                <Route path="/mypage">
                  <Mypage />
                </Route>
                <Route path="/user">
                  <User />
                </Route>
              </Switch>
            </Layout>
          </Route>
        )
        : <Redirect to="/login" />}
    </Switch>
  );
};
export default withRouter(Auth);
