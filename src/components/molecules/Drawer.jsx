import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { css, cx } from 'emotion';
import { createReactCSSTransitionStyle } from 'utilities/utils';

import List from 'atoms/List';

export default ({
  theme,
  containerProps: { container, list, general },
  toggleState
}) => {
  const name = 'drawer';
  const direction = 'left';
  const duration = 150;
  const verticalScrollbarWidth = theme.scrollbar.v;

  const componentStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    margin: '0',
    backgroundColor: '#fafad2',
    '& > li': {
      display: 'flex',
      alignItems: 'center',
      '& > a': {
        display: 'block',
        color: 'black',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        fontSize: '1rem',
        lineHeight: '0',
        '&:link': {},
        '&:visited': {},
        '&:hover': {
          backgroundColor: '#ddd',
          color: 'black'
        }
      }
    },
    [theme.breakpoints.maxWidthPresets.sm]: {
      justifyContent: 'flex-start',
      zIndex: theme.zIndex.drawer,
      position: 'fixed',
      top: '0',
      [direction]: '0',
      width: '200px',
      height: '100vh',
      flexDirection: 'column',
      '& > li': {
        '& > a': {
          width: '100%'
        }
      }
    }
  };

  const createMainAnimation = ({
    name,
    duration,
    styles: {
      close: [close_x, close_y],
      open: [open_x, open_y]
    }
  }) => {
    return createReactCSSTransitionStyle(name, {
      default: {
        transform: `translate3d(0,0,0)`,
        [theme.breakpoints.maxWidthPresets.sm]: {
          transform: `translate3d(${close_x},${close_y},0)`
        }
      },
      enter: {
        [theme.breakpoints.maxWidthPresets.sm]: {
          transform: `translate3d(${close_x},${close_y},0)`
        }
      },
      enterActive: {
        [theme.breakpoints.maxWidthPresets.sm]: {
          transform: `translate3d(${open_x},${open_y},0)`,
          transition: `transform ${duration}ms ease-out`
        }
      },
      exit: {
        [theme.breakpoints.maxWidthPresets.sm]: {
          transform: `translate3d(${open_x},${open_y},0)`
        }
      },
      exitActive: {
        [theme.breakpoints.maxWidthPresets.sm]: {
          transform: `translate3d(${close_x},${close_y},0)`,
          transition: `transform ${duration}ms ease-out`
        }
      }
    });
  };

  const createMainAnimationPresets = (
    name,
    direction,
    duration,
    verticalScrollbarWidth = 17
  ) => {
    let styles;
    if (direction === 'left') {
      styles = {
        close: [`-100%`, '0'],
        open: [`${verticalScrollbarWidth * -1}px`, '0']
      };
    } else if (direction === 'right') {
      styles = {
        close: [`100%`, '0'],
        open: [`${verticalScrollbarWidth * 2}px`, '0']
      };
    }
    return {
      name: name,
      direction: direction,
      duration: duration,
      verticalScrollbarWidth: verticalScrollbarWidth,
      styles: styles
    };
  };

  const mainAnimationPresets = createMainAnimationPresets(
    name,
    direction,
    duration,
    verticalScrollbarWidth
  );

  const mainAnimation = createMainAnimation(mainAnimationPresets);

  const createBackgroundAnimation = (
    name,
    direction,
    duration,
    verticalScrollbarWidth
  ) => {
    const overflowY = 'overflow-y: hidden;';
    const rigthMargin = `margin-right: ${verticalScrollbarWidth}px;`;
    const leftMargin = `margin-right: ${verticalScrollbarWidth}px;`;
    const x =
      direction === 'right'
        ? verticalScrollbarWidth * -1
        : verticalScrollbarWidth;

    return `
    ${theme.breakpoints.maxWidthPresets.sm} {
      body.${name}-background-enter {
        transform: translate3d(0px,0,0);
        overflow-x: hidden;
        ${direction === 'right' ? overflowY : ''}
        ${direction === 'right' ? rigthMargin : ''}
      }
      body.${name}-background-enter-active {
        transform: translate3d(${x}px,0,0);
        transition: transform ${duration}ms ease-out;
      }
      body.${name}-background-enter-done {
        transform: translate3d(${x}px,0,0);
        overflow-x: hidden;
        overflow-y: hidden;
        ${direction === 'right' ? rigthMargin : leftMargin}
      }
      body.${name}-background-exit {
        transform: translate3d(${x}px,0,0);
        overflow-x: hidden;
        ${direction === 'right' ? overflowY : ''}
        ${direction === 'right' ? rigthMargin : ''}
      }
      body.${name}-background-exit-active {
        transform: translate3d(0px,0,0);
        transition: transform ${duration}ms ease-out;
      }
    }
    `;
  };

  const backgroundAnimation = createBackgroundAnimation(
    name,
    direction,
    duration,
    verticalScrollbarWidth
  );
  let toggleNode = document.getElementsByTagName('body')[0];

  useEffect(() => {
    const styleNode = document.createElement('style');
    const ruleText = document.createTextNode(backgroundAnimation);
    styleNode.setAttribute('id', 'body-drawer');
    styleNode.appendChild(ruleText);
    document.getElementsByTagName('head')[0].appendChild(styleNode);
    return () => {
      const removeNode = document.getElementById('body-drawer');
      if (removeNode) {
        const parentNode = document.getElementsByTagName('head')[0];
        parentNode.removeChild(removeNode);
      }
    };
  });

  return (
    <CSSTransition
      in={toggleState === 'open'}
      timeout={duration}
      classNames={name}
      onEnter={() => {
        toggleNode.classList.remove('drawer-background-exit');
        toggleNode.classList.remove('drawer-background-exit-active');
        toggleNode.classList.add('drawer-background-enter');
      }}
      onEntering={() => {
        toggleNode.classList.add('drawer-background-enter-active');
      }}
      onEntered={() => {
        toggleNode.classList.remove('drawer-background-enter');
        toggleNode.classList.remove('drawer-background-enter-active');
        toggleNode.classList.add('drawer-background-enter-done');
      }}
      onExit={() => {
        toggleNode.classList.remove('drawer-background-enter');
        toggleNode.classList.remove('drawer-background-enter-active');
        toggleNode.classList.remove('drawer-background-enter-done');
        toggleNode.classList.add('drawer-background-exit');
      }}
      onExiting={() => {
        toggleNode.classList.add('drawer-background-exit-active');
      }}
      onExited={() => {
        toggleNode.classList.remove('drawer-background-exit');
        toggleNode.classList.remove('drawer-background-exit-active');
      }}
    >
      {state => {
        return (
          <ul className={cx(css(componentStyle), css(mainAnimation.style))}>
            <List theme={theme} containerProps={{ ...list, general }} />
          </ul>
        );
      }}
    </CSSTransition>
  );
};
