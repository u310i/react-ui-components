import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { css, cx } from 'emotion';
import {
  createReactCSSTransitionStyle,
  createReactCSSTransitionCallBack
} from 'utilities/utils';
import ActionIcon from 'atoms/ActionIcon';

import List from 'atoms/List';

export default ({
  theme,
  containerProps: { container, list, general, actionIconComponent },
  toggle,
  toggleState
}) => {
  const name = 'drawer';
  const direction = 'right';
  const duration = 150;
  const timingFunction = 'ease-out';

  const componentStyle = {
    overlay: {
      style: {
        display: 'none',
        [theme.breakpoint.createMediaQuerie('maxWidth', 'sm')]: {
          display: 'block',
          pointerEvents: toggleState === 'close' ? 'none' : 'auto',
          position: 'fixed',
          zIndex: '999',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'black'
        }
      }
    },
    main: {
      style: {
        [theme.breakpoint.createMediaQuerie('maxWidth', 'sm')]: {
          [direction]: '0',
          display: 'block',
          zIndex: theme.zIndex.drawer,
          position: 'fixed',
          padding: '0',
          top: '0',
          width: '400px',
          height: '100%'
        }
      },
      list: {
        style: {
          '& > li': {
            backgroundColor: '#fafad2',
            '& > a': {
              display: 'block',
              lineHeight: '1',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              fontSize: '1rem',
              '&:link': {},
              '&:visited': {},
              '&:hover': {
                backgroundColor: '#ffe4b5',
                color: 'black'
              }
            }
          },
          [theme.breakpoint.createMediaQuerie('minWidth', 'sm')]: {
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            backgroundColor: '#b0c4de'
          },
          [theme.breakpoint.createMediaQuerie('maxWidth', 'sm')]: {
            height: '100%',
            height: 'calc(100% - 3rem)',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            backgroundColor: '#e0ffff',
            '& > li': {
              width: '100%',
              backgroundColor: '#fafad2',
              '& > a': {
                width: '100%',
                color: 'black'
              }
            }
          }
        }
      },
      button: {
        style: {
          [theme.breakpoint.createMediaQuerie('minWidth', 'sm')]: {
            display: 'none'
          },
          [theme.breakpoint.createMediaQuerie('maxWidth', 'sm')]: {
            height: '3rem',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '17px',
            backgroundColor: '#ffc0cb'
          }
        }
      }
    }
  };

  const createDrawerTransitionStyle = () => {
    const x = direction === 'left' ? '-100%' : '100%';
    return createReactCSSTransitionStyle(name, {
      defaultStyle: {
        [theme.breakpoint.createMediaQuerie('maxWidth', 'sm')]: {
          '& > #ui-drawer-main': {
            transform: `translate3d(${x},0,0)`
          },
          '& > #ui-drawer-overlay': {
            opacity: '0'
          }
        }
      },
      enter: {
        [theme.breakpoint.createMediaQuerie('maxWidth', 'sm')]: {
          '& > #ui-drawer-main': {
            transform: `translate3d(${x},0,0)`
          },
          '& > #ui-drawer-overlay': {
            opacity: '0'
          }
        }
      },
      enterActive: {
        [theme.breakpoint.createMediaQuerie('maxWidth', 'sm')]: {
          '& > #ui-drawer-main': {
            transform: 'translate3d(0,0,0)',
            transition: `transform ${duration}ms ${timingFunction}`
          },
          '& > #ui-drawer-overlay': {
            opacity: '0.3',
            transition: `opacity ${duration}ms ${timingFunction}`
          }
        }
      },
      exit: {
        [theme.breakpoint.createMediaQuerie('maxWidth', 'sm')]: {
          '& > #ui-drawer-main': {
            transform: 'translate3d(0,0,0)'
          },
          '& > #ui-drawer-overlay': {
            opacity: '0.3'
          }
        }
      },
      exitActive: {
        [theme.breakpoint.createMediaQuerie('maxWidth', 'sm')]: {
          '& > #ui-drawer-main': {
            transform: `translate3d(${x},0,0)`,
            transition: `transform ${duration}ms ${timingFunction}`
          },
          '& > #ui-drawer-overlay': {
            opacity: '0',
            transition: `opacity ${duration}ms ${timingFunction}`
          }
        }
      }
    });
  };

  const drawerTransitionStyle = createDrawerTransitionStyle();

  useEffect(() => {
    const head = document.head;
    const backgroundTransitionStyle = `
    ${theme.breakpoint.presets.sm} {
      body.drawer-overflow-hidden {
        overflow: hidden;
      }
    }
    `;
    const styleNode = document.createElement('style');
    const ruleText = document.createTextNode(backgroundTransitionStyle);
    styleNode.setAttribute('id', 'body-drawer');
    styleNode.appendChild(ruleText);
    head.appendChild(styleNode);
    return () => {
      const removeNode = document.getElementById('body-drawer');
      if (removeNode) {
        head.removeChild(removeNode);
      }
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    if (toggleState === 'open') {
      body.classList.add('drawer-overflow-hidden');
    }
    return () => {
      if (body.classList.contains('drawer-overflow-hidden')) {
        body.classList.remove('drawer-overflow-hidden');
      }
    };
  });

  return (
    <CSSTransition
      in={toggleState === 'open'}
      timeout={duration}
      classNames={name}
    >
      <div
        className={cx(css(componentStyle), css(drawerTransitionStyle))}
        id="ui-drawer"
      >
        <div
          onClick={toggle}
          className={cx(css(componentStyle.overlay.style))}
          id="ui-drawer-overlay"
        />
        <div className={cx(css(componentStyle.main.style))} id="ui-drawer-main">
          <div
            className={cx(css(componentStyle.main.button.style))}
            id="ui-drawer-main-button"
          >
            {actionIconComponent}
          </div>
          <ul
            className={cx(css(componentStyle.main.list.style))}
            id="ui-drawer-main-list"
          >
            <List
              theme={theme}
              containerProps={{ ...list, general }}
              tagName="li"
            />
          </ul>
        </div>
      </div>
    </CSSTransition>
  );
};
