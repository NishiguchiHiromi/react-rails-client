import React, { useState } from 'react';
import {
  Layout, AppBar, UserMenu, MenuItemLink, useAuthProvider, Button,
} from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  Avatar, Typography, Drawer, List, ListItem, ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconKeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import useInitialFetch from 'hooks/useInitialFetch';
import { customLinkSettings } from './CustomRoutes';
import Menu from './Menu';

const useStyles = makeStyles({
  avatar: {
    height: 24,
    width: 24,
  },
});

const MyCustomAvatarIcon = ({ avatar_url }) => {
  const classes = useStyles();
  return <Avatar src={avatar_url} className={classes.avatar} />;
};

const MyUserMenu = (props) => {
  const { loginUserInfo } = useAuthProvider();
  if (!loginUserInfo) return null;
  const avatar_url = loginUserInfo.avatar?.src;
  return (
    <UserMenu
      label={loginUserInfo ? loginUserInfo.name : ''}
      icon={avatar_url ? <MyCustomAvatarIcon avatar_url={avatar_url} /> : undefined}
      {...props}
    >
      <MenuItemLink
        to="/profile"
        primaryText="Profile"
        leftIcon={<SettingsIcon />}
      />
    </UserMenu>
  );
};

const useAppbarStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
});

const MyAppBar = (props) => {
  const classes = useAppbarStyles();
  return (
    <AppBar
      {...props}
      userMenu={<MyUserMenu />}
    >
      <Typography
        variant="h6"
        color="inherit"
        className={classes.title}
        id="react-admin-title"
      />
      <Notification />
    </AppBar>
  );
};

const useDrawerStyles = makeStyles({
  root: {
    minWidth: '240px',
  },
});

const Notification = () => {
  const classes = useDrawerStyles();
  const [showPanel, setShowPanel] = useState(false);
  const notifications = useInitialFetch('notifications') || [];
  return (
    <>
      <IconButton aria-label={`show ${notifications.length} new notifications}`} color="inherit" onClick={() => setShowPanel(true)}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={showPanel}
        onClose={() => setShowPanel(false)}
      >
        <div
          className={classes.root}
        >
          <Button label="Close" onClick={() => setShowPanel(false)}>
            <IconKeyboardArrowRight />
          </Button>

          {notifications.map((n) => (
            <List component="nav" aria-label="mailbox folders">
              <ListItem button>
                <ListItemText primary={n.title} />
              </ListItem>
            </List>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default (props) => (
  <Layout
    {...props}
    menu={(menuProps) => <Menu {...menuProps} customLinks={customLinkSettings} />}
    appBar={MyAppBar}
  />
);
