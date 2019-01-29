import React, { useState, useCallback, useRef, useMemo } from 'react';

import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { extractCurrentScreenSizeProps } from 'utilities/breakpointUtils';

import IconButton from 'components/IconButton';
import { Container as DrawerContainer } from 'components/Drawer';
import Menu from 'components/Menu';
import AppBar from 'components/AppBar';
/*




  Header */

const Header = ({
  breakpoint,
  componentProps: {
    options: propOptions,
    appbar,
    menu,
    drawer,
    drawerButton,
    list
  },
  theme
}) => {
  const options = {};
  options['header'] = useMemo(
    () => extractCurrentScreenSizeProps(breakpoint, propOptions),
    [breakpoint]
  );

  const {
    style: propStyle,
    menu: shouldMountMenu = !header_options.drawer,
    drawer: shouldMountDrawer = !header_options.menu
  } = options.header;

  options['appbar'] = extractCurrentScreenSizeProps(breakpoint, appbar.options);

  /*
  style
  */
  const componentStyle = useMemo(
    () => ({
      style: {},
      appbar: {
        style: {},
        menu: {
          style: {
            marginLeft: 'auto'
          }
        },
        drawerButton: {
          style: {
            marginLeft: 'auto'
          }
        }
      }
    }),
    []
  );

  /*
  component
  */

  const container = useMemo(() => document.getElementById('app'), []);

  const drawerContainer = DrawerContainer({
    theme: theme,
    parentProps: {},
    options: drawer.options,
    list: list,
    breakpoint: breakpoint,
    showBreakpoint: ['sm'],
    container
  });

  const icon = useMemo(
    () => {
      const i = drawerButton.icon;
      if (i.open.icon) {
        if (i.close.icon && drawerContainer.state === 'close') {
          return {
            type: i.close.type,
            icon: i.close.icon
          };
        } else {
          return {
            type: i.open.type,
            icon: i.open.icon
          };
        }
      } else {
        return {
          type: 'fa',
          icon: faBars
        };
      }
    },
    [drawerContainer.state]
  );

  const DrawerButton = useMemo(
    () => {
      const style = {
        ...componentStyle.appbar.drawerButton.style,
        ...drawerButton.options.style
      };
      return (
        !shouldMountMenu && (
          <IconButton
            icon={icon}
            options={drawerButton.options}
            style={style}
            onClick={drawerContainer.onClick}
          />
        )
      );
    },
    [breakpoint, drawerContainer.state]
  );

  const MenuItem = useMemo(() => {
    return (
      <Menu
        parentProps={{ style: componentStyle.appbar.menu.style }}
        theme={theme}
        list={list}
        options={menu.options}
      />
    );
  });

  const BarItem = [(shouldMountMenu && MenuItem) || DrawerButton];

  const appbarStyle = options.appbar.style;

  /*
  return
  */
  return (
    <nav
      className={cx(
        css({ ...componentStyle.style, ...propStyle }),
        'uc-header'
      )}
    >
      <AppBar
        theme={theme}
        options={options.appbar}
        style={appbarStyle}
        list={BarItem}
      />
      {shouldMountDrawer && drawerContainer.component}
    </nav>
  );
};

export default Header;
