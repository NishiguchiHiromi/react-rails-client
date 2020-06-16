import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PublicRoute from 'components/routes/PublicRoute';
import Auth from './components/Auth';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/public">
          <PublicRoute />
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
}
