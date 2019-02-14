import React, { useState, useCallback, useRef, useMemo } from 'react';

import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { extractCurrentScreenSizeProps } from 'utilities/breakpointUtils';

import IconButton from 'components/IconButton';
import { Generator as GenerateDrawer } from 'components/Drawer';
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

  const drawerContainer = GenerateDrawer({
    theme: theme,
    parentProps: {},
    options: drawer.options,
    list: list,
    breakpoint: breakpoint,
    showBreakpoint: ['sm'],
    container
  });

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

  const BarItem = [
    (shouldMountMenu && MenuItem) || drawerContainer.toggleButton
  ];

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
