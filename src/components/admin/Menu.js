import * as React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import inflection from 'inflection';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import DefaultIcon from '@material-ui/icons/ViewList';
import classnames from 'classnames';
import {
  getResources, useTranslate, DashboardMenuItem, MenuItemLink,
} from 'react-admin';

const useStyles = makeStyles(
  {
    main: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  { name: 'RaMenu' },
);

const translatedResourceName = (resource, translate) => translate(`resources.${resource.name}.name`, {
  smart_count: 2,
  _:
            resource.options && resource.options.label
              ? translate(resource.options.label, {
                smart_count: 2,
                _: resource.options.label,
              })
              : inflection.humanize(inflection.pluralize(resource.name)),
});

const Menu = (props) => {
  const {
    classes: classesOverride,
    className,
    dense,
    hasDashboard,
    onMenuClick,
    logout,
    customLinks,
    ...rest
  } = props;
  const translate = useTranslate();
  const classes = useStyles(props);
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources, shallowEqual);

  // Used to force redraw on navigation
  useSelector((state) => state.router.location.pathname);

  return (
    <div className={classnames(classes.main, className)} {...rest}>
      {hasDashboard && (
        <DashboardMenuItem
          onClick={onMenuClick}
          dense={dense}
          sidebarIsOpen={open}
        />
      )}
      {resources
        .filter((r) => r.hasList)
        .map((resource) => (
          <MenuItemLink
            key={resource.name}
            to={`/${resource.name}`}
            primaryText={translatedResourceName(
              resource,
              translate,
            )}
            leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
            onClick={onMenuClick}
            dense={dense}
            sidebarIsOpen={open}
          />
        ))}
      {(customLinks || [])
        .map((resource) => (
          <MenuItemLink
            key={resource.name}
            to={resource.path}
            primaryText={resource.name}
            leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
            onClick={onMenuClick}
            dense={dense}
            sidebarIsOpen={open}
          />
        ))}
      {isXSmall && logout}
    </div>
  );
};

export default Menu;
