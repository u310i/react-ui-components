import React, { useState, useCallback, useRef, useMemo } from 'react';

import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { extractCurrentScreenSizeProps } from 'utilities/breakpointUtils';

import IconButton from 'atoms/IconButton';
import { Container as DrawerContainer } from 'molecules/Drawer';
import Menu from 'molecules/Menu';
import { AdvancedAppBar } from 'atoms/AppBar';
/*




  Header */

const Header = ({
  forwardRef = null,
  parentProps = {},
  breakpoint,
  componentProps: { options, bar, menu, drawer, drawerButton, list },
  theme
}) => {
  const { style: parentStyle = {} } = parentProps;

  const header_options = useMemo(
    () => {
      return extractCurrentScreenSizeProps(breakpoint, options);
    },
    [breakpoint]
  );
  const {
    style: propStyle,
    menu: shouldMountMenu = !header_options.drawer,
    drawer: shouldMountDrawer = !header_options.menu
  } = header_options;

  const bar_options = extractCurrentScreenSizeProps(breakpoint, bar.options);

  /*
  style
  */
  const componentStyle = useMemo(
    () => ({
      style: {},
      bar: {
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

  const rootElement = useMemo(() => document.getElementById('app'), []);

  const drawerContainer = DrawerContainer({
    theme: theme,
    parentProps: {},
    options: drawer.options,
    list: list,
    breakpoint: breakpoint,
    showBreakpoint: ['sm'],
    rootElement
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
      return (
        !shouldMountMenu && (
          <IconButton
            parentProps={{ style: componentStyle.bar.drawerButton.style }}
            icon={icon}
            options={drawerButton.options}
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
        parentProps={{ style: componentStyle.bar.menu.style }}
        theme={theme}
        list={list}
        options={menu.options}
      />
    );
  });

  const BarItem = [(shouldMountMenu && MenuItem) || DrawerButton];

  /*
  return
  */
  return (
    <nav
      ref={forwardRef}
      className={cx(
        css({ ...componentStyle.style, ...parentStyle, ...propStyle }),
        'uc-header'
      )}
    >
      <AdvancedAppBar theme={theme} options={bar_options} list={BarItem} />
      {shouldMountDrawer && drawerContainer.component}
    </nav>
  );
};

export default Header;
