import React from 'react';
import {
  Route, Switch, withRouter,
} from 'react-router-dom';
import Public from 'components/Public';

const PublicRoute = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`}>
      <Public />
    </Route>
    <Route path={`${match.url}/hoge`}>
      hoge
    </Route>
    <Route path={`${match.url}/fuga`}>
      fuga
    </Route>
  </Switch>
);

export default withRouter(PublicRoute);
