import React, { useState, useCallback, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { css, cx } from 'react-emotion';

import { faBars } from '@fortawesome/free-solid-svg-icons';

import { genReactCSSTransitionStyle } from 'utilities/utils';
import { useGetStateOnScroll } from 'utilities/hooks';
import IconButton from 'atoms/IconButton';
import Drawer from 'molecules/Drawer';
import Menu from 'molecules/Menu';

const Header = ({
  theme,
  breakpointState,
  componentProps: { style, menu, drawer, drawerButton, list }
}) => {
  const [drawerState, setDrawerState] = useState('close');

  const onClick = useCallback(() => {
    setDrawerState(prev => {
      return prev === 'close' ? 'open' : 'close';
    });
  }, []);

  const onClose = useCallback(() => {
    setDrawerState('close');
  }, []);

  const hideBarName = 'hideBar',
    hideBarTimingFunction = 'ease-out',
    hideBarDuration = 200;

  if (drawerState === 'open' && breakpointState !== 'sm') {
    setDrawerState('close');
  }

  const headerEl = useRef(null);
  const headerState = useGetStateOnScroll(headerEl);

  const hideBarStyle = genReactCSSTransitionStyle(hideBarName, () => {
    return {
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
    };
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

  let icon;
  if (drawerButton.icon.close && drawerButton.icon.open) {
    icon =
      drawerState === 'close'
        ? drawerButton.icon.close
        : drawerButton.icon.open;
  } else {
    icon = faBars;
  }

  const button = (
    <IconButton icon={icon} style={drawerButton.style} onClick={onClick} />
  );

  return (
    <nav className={cx(css(componentStyle.style), css(style), 'uc-header')}>
      <CSSTransition
        in={headerState === 'hide'}
        timeout={hideBarDuration}
        classNames={hideBarName}
      >
        <div
          ref={headerEl}
          className={cx(
            css(componentStyle.bar.style),
            css(hideBarStyle),
            'uc-header-bar'
          )}
        >
          {breakpointState !== 'sm' ? (
            <Menu theme={theme} list={list} />
          ) : (
            button
          )}
        </div>
      </CSSTransition>
      {breakpointState === 'sm' && (
        <Drawer
          theme={theme}
          options={drawer}
          list={list}
          onClose={onClose}
          state={drawerState}
        />
      )}
      <div className={cx(css(componentStyle.dummy.style), 'uc-header-dummy')} />
    </nav>
  );
};

export default Header;
