import React, { cloneElement } from 'react';
import { Route } from 'react-router-dom';
import {
  useAuthState, useRedirect, useLogout, Loading,
} from 'react-admin';
import Profile from './profile';
import Department from './Department';
import Public from './Public';

const routeSetting = [
  {
    name: 'profile', path: '/profile', Component: Profile, exact: true, restricted: true, noLink: true,
  },
  {
    name: '組織図', path: '/department', Component: Department, exact: true, restricted: true,
  },
  {
    name: 'パブリックページ', path: '/public', Component: Public, exact: true, noLink: true, noLayout: true,
  },
];

// 要ログインの場合と特定の権限が必要な場合とをわける！！
const Restricted = ({ children }) => {
  const redirect = useRedirect();
  const logout = useLogout();
  const { loading, authenticated } = useAuthState();
  if (loading) return <Loading />;
  if (!authenticated) {
    // redirect('/');
    logout();
    return null;
  }
  return cloneElement(children);
};

export const CustomRoutes = routeSetting
  .map(({
    path, Component, exact, noLayout, restricted,
  }) => (restricted ? (
    <Route
      exact={exact}
      path={path}
      noLayout={noLayout}
      render={() => <Restricted><Component /></Restricted>}
    />
  ) : <Route exact={exact} path={path} noLayout={noLayout} component={Component} />
  ));
export const customLinkSettings = routeSetting.filter(({ noLink }) => !noLink);
