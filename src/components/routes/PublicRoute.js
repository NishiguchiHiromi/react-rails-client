import React from 'react';
import {
  Route, Switch, withRouter,
} from 'react-router-dom';

const PublicRoute = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`}>
      パブリックなページ
    </Route>
    {/* <Route path={`${match.url}/hoge`}>
      hoge
    </Route>
    <Route path={`${match.url}/fuga`}>
      fuga
    </Route> */}
  </Switch>
);

export default withRouter(PublicRoute);
