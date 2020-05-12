import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import Public from './components/Public';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/public">
          <Public />
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
}
