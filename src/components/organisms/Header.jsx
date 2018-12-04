import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';

import {
  createOptimizedEvent,
  createReactCSSTransitionStyle,
  createGetScrollUpDownState
} from 'utilities/utils';
import IconButton from 'atoms/iconButton';
import Drawer from 'molecules/Drawer';
import Menu from 'molecules/Menu';
console.log('header-outer');
console.log(document.body.clientWidth);

const Header = ({
  theme,
  breakpointState,
  componentProps: { style, menu, drawerButton }
}) => {
  console.log('header');
  console.log(document.body.clientWidth);
  const [drawerState, setDrawerState] = useState('close');
  const [headerState, setHeaderState] = useState('show');
  const drawerToggle = () => {
    setDrawerState(drawerState === 'close' ? 'open' : 'close');
  };

  const hideBarName = 'hideBar',
    hideBarTimingFunction = 'ease-out',
    hideBarDuration = 200;

  useEffect(() => {
    if (drawerState === 'open' && breakpointState !== 'sm') {
      setDrawerState('close');
    }
  });

  useEffect(() => {
    const targetElement = document.getElementById('uc-header-bar'),
      targetHeight = targetElement.offsetHeight;
    let currentPosition,
      scrollState,
      preState,
      state = currentPosition > targetHeight ? 'show' : 'quickly-show';
    const getScrollUpDownState = createGetScrollUpDownState();
    const setHeaderStateOnScroll = () => {
      currentPosition = window.pageYOffset;
      scrollState = getScrollUpDownState();
      preState = state;
      if (currentPosition > targetHeight) {
        state = scrollState !== 'down' ? 'show' : 'hide';
      } else {
        state = 'quickly-show';
      }
      if (state !== preState) {
        setHeaderState(state);
      }
    };

    const hideHeaderOnScroll = createOptimizedEvent(setHeaderStateOnScroll);

    window.addEventListener('scroll', hideHeaderOnScroll);

    return () => {
      window.removeEventListener('scroll', hideHeaderOnScroll);
    };
  }, []);

  const hideBarStyle = createReactCSSTransitionStyle(hideBarName, {
    enter: {
      transform: `translate3d(0,0,0)`
    },
    enterActive: {
      transform: `translate3d(0,-100%,0)`,
      transition: `transform ${hideBarDuration}ms ${hideBarTimingFunction}`
    },
    exit: {
      transform: `translate3d(0,-100%,0)`
    },
    exitActive: {
      transform: `translate3d(0,0,0)`,
      transition: `transform ${
        headerState === 'quickly-show' ? 0 : hideBarDuration
      }ms ${hideBarTimingFunction}`
    }
  });

  const componentStyle = {
    style: {},
    bar: {
      style: {
        backgroundColor: '#333',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '3rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        [theme.breakpoint.createMediaQuerie('minWidth', 'sm')]: {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          zIndex: '100'
        },
        [theme.breakpoint.createMediaQuerie('maxWidth', 'sm')]: {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          zIndex: '100'
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
  };

  let drawerButtonIcon;
  if (drawerButton.icon.close && drawerButton.icon.open) {
    drawerButtonIcon =
      drawerState === 'close'
        ? drawerButton.icon.close
        : drawerButton.icon.open;
  } else {
    icon = faBars;
  }

  const drawerToggleButton = (
    <IconButton
      theme={theme}
      icon={drawerButtonIcon}
      style={drawerButton.style}
      toggle={drawerToggle}
    />
  );

  return (
    <nav className={cx(css(componentStyle.style), css(style))} id="uc-header">
      <CSSTransition
        in={headerState === 'hide'}
        timeout={hideBarDuration}
        classNames={hideBarName}
      >
        <div
          className={cx(css(componentStyle.bar.style), css(hideBarStyle))}
          id="uc-header-bar"
        >
          {breakpointState !== 'sm' ? (
            <Menu theme={theme} itemList={menu.itemList} />
          ) : (
            drawerToggleButton
          )}
        </div>
      </CSSTransition>
      {breakpointState === 'sm' && (
        <Drawer
          theme={theme}
          itemList={menu.itemList}
          toggle={drawerToggle}
          toggleState={drawerState}
          toggleButton={drawerToggleButton}
          breakpointState={breakpointState}
        />
      )}
      <div
        className={cx(css(componentStyle.dummy.style))}
        id="uc-header-dummy"
      />
    </nav>
  );
};

export default Header;
