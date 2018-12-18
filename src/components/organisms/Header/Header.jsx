import React, { useState, useCallback, useRef, useMemo } from 'react';
import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { extractCurrentScreenSizeProps } from 'utilities/utils';

import IconButton from 'atoms/IconButton';
import Drawer from 'molecules/Drawer';
import Menu from 'molecules/Menu';
import AppBar from 'atoms/AppBar';

/*




  Header */

const Header = ({
  propRef = null,
  parent = {},
  breakpointState,
  componentProps: { options, bar, menu, drawer, drawerButton, list },
  theme
}) => {
  const [drawerState, setDrawerState] = useState(
    drawerDefaultDisplay ? 'open' : 'close'
  );

  const { style: parentStyle = {} } = parent;

  const header_options = extractCurrentScreenSizeProps(
    breakpointState,
    options
  );
  const {
    style: propStyle,
    menu: displayMenu = header_options.drawer ? false : true,
    drawer: displayDrawer = header_options.menu ? false : true,
    drawerOptions: { defaultDisplay: drawerDefaultDisplay = false }
  } = header_options;

  const bar_options = extractCurrentScreenSizeProps(
    breakpointState,
    bar.options
  );

  const onClick = useCallback(() => {
    setDrawerState(prev => {
      return prev === 'close' ? 'open' : 'close';
    });
  }, []);

  const onClose = useCallback(() => {
    setDrawerState('close');
  }, []);

  if (drawerState === 'open' && breakpointState !== 'sm') {
    setDrawerState('close');
  }

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
  const SwitchDrawer = useMemo(
    () => {
      return (
        displayDrawer && (
          <Drawer
            theme={theme}
            options={drawer.options}
            list={list}
            onClose={onClose}
            state={drawerState}
          />
        )
      );
    },
    [breakpointState, drawerState]
  );

  const DrawerButton = useMemo(
    () => {
      const icon =
        drawerButton.icon.close && drawerButton.icon.open
          ? drawerState === 'close'
            ? drawerButton.icon.close
            : drawerButton.icon.open
          : faBars;
      return (
        <IconButton
          parent={{ style: componentStyle.bar.drawerButton.style }}
          icon={icon}
          options={drawerButton.options}
          onClick={onClick}
        />
      );
    },
    [drawerState]
  );

  const SwitchBarItem = useMemo(
    () => {
      return displayMenu ? (
        <Menu
          parent={{ style: componentStyle.bar.menu.style }}
          theme={theme}
          list={list}
          options={menu.options}
        />
      ) : (
        DrawerButton
      );
    },
    [breakpointState, drawerState]
  );

  const BarItem = [SwitchBarItem];

  /*
  return
  */
  return (
    <nav
      ref={propRef}
      className={cx(
        css({ ...componentStyle.style, ...parentStyle, ...propStyle }),
        'uc-header'
      )}
    >
      <AppBar theme={theme} options={bar_options} list={BarItem} />
      {SwitchDrawer}
    </nav>
  );
};

export default Header;
