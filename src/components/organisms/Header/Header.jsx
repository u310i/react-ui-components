import React, { useState, useCallback, useRef, useMemo } from 'react';
import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { extractCurrentScreenSizeProps } from 'utilities/utils';

import IconButton from 'atoms/IconButton';
import Drawer from 'molecules/Drawer';
import { Container as DrawerContainer } from 'molecules/Drawer';
import Menu from 'molecules/Menu';
import { AdvancedAppBar } from 'atoms/AppBar';

/*




  Header */

const Header = ({
  parentRef = null,
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

  const drawerContainer = DrawerContainer({
    theme: theme,
    parentProps: {},
    options: drawer.options,
    list: list,
    breakpoint: breakpoint,
    showBreakpoint: ['sm']
  });

  const icon = useMemo(
    () => {
      return drawerButton.icon.close && drawerButton.icon.open
        ? drawerContainer.state === 'close'
          ? drawerButton.icon.close
          : drawerButton.icon.open
        : faBars;
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
      ref={parentRef}
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
