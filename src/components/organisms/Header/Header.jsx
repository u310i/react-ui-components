import React, { useState, useCallback, useRef, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';

import { genReactCSSTransitionStyle } from 'utilities/utils';
import { useSetDisplayStatusOnScroll } from 'utilities/hooks';
import IconButton from 'atoms/IconButton';
import Drawer from 'molecules/Drawer';
import Menu from 'molecules/Menu';
import AppBar from 'atoms/AppBar';

const hideBarName = 'hideBar';

const Header = ({
  propRef = null,
  parent = {},
  theme,
  breakpointState,
  componentProps: { options, menu, drawer, drawerButton, list }
}) => {
  const { style: parentStyle = {} } = parent;
  const {
      style: propStyle,
      barStyle: propBarStyle,
      height,
      sm: bp_sm,
      lg: bp_lg
    } = options,
    bpOptions = breakpointState === 'sm' ? bp_sm : bp_lg;

  const {
    position: bp_position = 'static',
    top: bp_top = 'auto',
    menu: bp_menu = false,
    drawer: bp_drawer = false,
    drawerOptions: { defaultDisplay: bp_drawer_defaultDisplay = false },
    hideOnScroll: bp_hideOnScroll = false,
    hideOnScrollOptions: {
      keepHeight: bp_hideOnScroll_KeepHeight = true,
      timingFunction: bp_hideOnScroll_timingFunction = 'ease-out',
      duration: bp_hideOnScroll_duration = 200
    }
  } = bpOptions;

  const barOptions = {
    style: propBarStyle,
    height: height,
    position: bp_position,
    top: bp_top
  };

  const [drawerState, setDrawerState] = useState(
    bp_drawer_defaultDisplay ? 'open' : 'close'
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

  // scroll
  const [rowState, setRowState] = useState('show');
  const headerEl = useRef(null);
  useSetDisplayStatusOnScroll(
    setRowState,
    bp_hideOnScroll && bp_position === 'fixed' ? headerEl : false,
    !bp_hideOnScroll
  );
  const hideBarTransitionStyle = useMemo(() => {
    return genReactCSSTransitionStyle(hideBarName, () => {
      return {
        enter: {
          transform: `translate3d(0,0,0)`
        },
        enterActive: {
          transform: `translate3d(0,-100%,0)`,
          transition: `transform ${bp_hideOnScroll_duration}ms ${bp_hideOnScroll_timingFunction}`
        },
        exit: {
          transform: `translate3d(0,-100%,0)`
        },
        exitActive: {
          transform: `translate3d(0,0,0)`,
          transition: `transform ${bp_hideOnScroll_duration}ms ${bp_hideOnScroll_timingFunction}`
        }
      };
    });
  }, []);

  // component
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
      },
      dummy: {
        style: {
          opacity: '0',
          height: '3rem',
          width: '100%'
        }
      }
    }),
    []
  );

  const cancelTransition = useMemo(
    () => {
      return rowState === 'quickly-show' && bp_hideOnScroll
        ? {
            transition: `transform 0ms linear`
          }
        : {};
    },
    [rowState, breakpointState]
  );

  const DrawerButtonComponent = useMemo(
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

  const SwitchBarItemComponent = useMemo(
    () => {
      return bp_menu ? (
        <Menu
          parent={{ style: componentStyle.bar.menu.style }}
          theme={theme}
          list={list}
          options={menu.options}
        />
      ) : (
        DrawerButtonComponent
      );
    },
    [breakpointState, drawerState]
  );

  const BarItemComponent = <>{SwitchBarItemComponent}</>;

  const DrawerComponent = useMemo(
    () => {
      return bp_drawer ? (
        <Drawer
          theme={theme}
          options={drawer.options}
          list={list}
          onClose={onClose}
          state={drawerState}
        />
      ) : (
        ''
      );
    },
    [breakpointState, drawerState]
  );

  const DummyHeightComponent = useMemo(
    () => {
      return bp_hideOnScroll &&
        bp_position === 'fixed' &&
        bp_hideOnScroll_KeepHeight ? (
        <div
          className={cx(css(componentStyle.dummy.style), 'uc-header-dummy')}
        />
      ) : (
        ''
      );
    },
    [breakpointState]
  );

  return (
    <nav
      ref={propRef}
      className={cx(
        css({ ...componentStyle.style, ...parentStyle, ...propStyle }),
        'uc-header'
      )}
    >
      <CSSTransition
        in={bp_hideOnScroll && rowState === 'hide'}
        timeout={bp_hideOnScroll_duration}
        classNames={hideBarName}
      >
        <AppBar
          propRef={headerEl}
          theme={theme}
          parent={{
            style: {
              ...propBarStyle,
              ...hideBarTransitionStyle,
              ...cancelTransition
            }
          }}
          options={barOptions}
        >
          {BarItemComponent}
        </AppBar>
      </CSSTransition>
      {DrawerComponent}
      {DummyHeightComponent}
    </nav>
  );
};

export default Header;
