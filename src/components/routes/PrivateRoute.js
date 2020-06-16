import React from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import Layout from 'components/Layout';
import Mypage from 'components/Mypage';
import User from 'components/user/User';
import Department from 'components/department';

const PrivateRoute = ({ loginUser, logout }) => (
  <Layout loginUser={loginUser} logout={() => logout()}>
    <Switch>
      <Route path="/mypage">
        <Mypage />
      </Route>
      <Route path="/user">
        <User />
      </Route>
      <Route path="/department">
        <Department />
      </Route>
    </Switch>
  </Layout>
);
export default PrivateRoute;
