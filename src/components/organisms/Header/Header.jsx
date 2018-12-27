import React, { useState, useCallback, useRef, useMemo } from 'react';
import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { extractCurrentScreenSizeProps } from 'utilities/utils';

import IconButton from 'atoms/IconButton';
import Drawer from 'molecules/Drawer';
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
    drawer: shouldMountDrawer = !header_options.menu,
    drawerOptions: { defaultDisplay: drawerDefaultDisplay = false }
  } = header_options;

  const [drawerState, setDrawerState] = useState(
    drawerDefaultDisplay ? 'open' : 'close'
  );

  useCallback(
    () => {
      if (defaultDisplay === true) {
        setDrawerState('open');
      }
    },
    [drawerDefaultDisplay]
  );

  const bar_options = extractCurrentScreenSizeProps(breakpoint, bar.options);

  const onClick = useCallback(() => {
    setDrawerState(prev => {
      return prev === 'close' ? 'open' : 'close';
    });
  }, []);

  const onClose = useCallback(() => {
    setDrawerState('close');
  }, []);

  if (drawerState === 'open' && breakpoint !== 'sm') {
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
  const MountableDrawer = useMemo(
    () => {
      return (
        shouldMountDrawer && (
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
    [breakpoint, drawerState]
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
          parentProps={{ style: componentStyle.bar.drawerButton.style }}
          icon={icon}
          options={drawerButton.options}
          onClick={onClick}
        />
      );
    },
    [drawerState]
  );

  const MenuOrDrawerButton = useMemo(
    () => {
      return shouldMountMenu ? (
        <Menu
          parentProps={{ style: componentStyle.bar.menu.style }}
          theme={theme}
          list={list}
          options={menu.options}
        />
      ) : (
        DrawerButton
      );
    },
    [breakpoint, drawerState]
  );

  const BarItem = [MenuOrDrawerButton];

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
      {MountableDrawer}
    </nav>
  );
};

export default Header;
