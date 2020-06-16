import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import UserDetail from './UserDetail';
import UserEdit from './UserEdit';
import UserIndex from './UserIndex';
import UserNew from './UserNew';

const User = ({ match }) => (
  <div>
    User
    <Switch>
      <Route exact path={match.url}>
        <UserIndex />
      </Route>
      <Route path={`${match.url}/new`}>
        <UserNew />
      </Route>
      <Route exact path={`${match.url}/:id`}>
        <UserDetail />
      </Route>
      <Route path={`${match.url}/:id/edit`}>
        <UserEdit />
      </Route>
    </Switch>
  </div>
);
export default withRouter(User);
