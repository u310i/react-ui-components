import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { css, cx } from 'emotion';
import { createReactCSSTransitionStyle } from 'utilities/utils';
import Link from 'atoms/Link';

import List from 'atoms/List';
console.log('drawer-outer');
console.log(document.body.clientWidth);

const Drawer = ({ theme, itemList, toggle, toggleState, toggleButton }) => {
  console.log('drawer');
  console.log(document.body.clientWidth);
  const name = 'drawer';
  const direction = 'right';
  const duration = 150;
  const timingFunction = 'ease-out';

  const componentStyle = {
    overlay: {
      style: {
        display: 'none',
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
    },
    main: {
      style: {
        [direction]: '0',
        display: 'block',
        zIndex: theme.zIndex.drawer,
        position: 'fixed',
        padding: '0',
        top: '0',
        width: '400px',
        height: '100%'
      },
      list: {
        style: {
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
          },
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
          }
        }
      },
      header: {
        style: {
          height: '3rem',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: '#ffc0cb',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem'
        }
      }
    }
  };

  const x = direction === 'left' ? '-100%' : '100%';
  const drawerTransitionStyle = createReactCSSTransitionStyle(name, {
    defaultStyle: {
      '& > #uc-drawer-main': {
        transform: `translate3d(${x},0,0)`
      },
      '& > #uc-drawer-overlay': {
        opacity: '0'
      }
    },
    enter: {
      '& > #uc-drawer-main': {
        transform: `translate3d(${x},0,0)`
      },
      '& > #uc-drawer-overlay': {
        opacity: '0'
      }
    },
    enterActive: {
      '& > #uc-drawer-main': {
        transform: 'translate3d(0,0,0)',
        transition: `transform ${duration}ms ${timingFunction}`
      },
      '& > #uc-drawer-overlay': {
        opacity: '0.3',
        transition: `opacity ${duration}ms ${timingFunction}`
      }
    },
    exit: {
      '& > #uc-drawer-main': {
        transform: 'translate3d(0,0,0)'
      },
      '& > #uc-drawer-overlay': {
        opacity: '0.3'
      }
    },
    exitActive: {
      '& > #uc-drawer-main': {
        transform: `translate3d(${x},0,0)`,
        transition: `transform ${duration}ms ${timingFunction}`
      },
      '& > #uc-drawer-overlay': {
        opacity: '0',
        transition: `opacity ${duration}ms ${timingFunction}`
      }
    }
  });

  useEffect(() => {
    const head = document.head;
    const backgroundTransitionStyle = `
      body.drawer-overflow-hidden {
        overflow: hidden;
      }
    }
    `;
    // margin-${direction === 'right' ? 'right' : 'left'}: 17px;
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
    } else {
      body.classList.remove('drawer-overflow-hidden');
    }
    return () => {
      if (body.classList.contains('drawer-overflow-hidden')) {
        body.classList.remove('drawer-overflow-hidden');
      }
    };
  });
  const item = ({ key, text, attribute, style }) => {
    return (
      <li key={key}>
        <Link text={text} attribute={attribute} style={style} />
      </li>
    );
  };

  return (
    <CSSTransition
      in={toggleState === 'open'}
      timeout={duration}
      classNames={name}
    >
      <div
        className={cx(css(componentStyle), css(drawerTransitionStyle))}
        id="uc-drawer"
      >
        <div
          onClick={toggle}
          className={cx(css(componentStyle.overlay.style))}
          id="uc-drawer-overlay"
        />
        <div className={cx(css(componentStyle.main.style))} id="uc-drawer-main">
          <div
            className={cx(css(componentStyle.main.header.style))}
            id="uc-drawer-main-header"
          >
            {toggleButton}
          </div>
          <ul
            className={cx(css(componentStyle.main.list.style))}
            id="uc-drawer-main-list"
          >
            <List
              theme={theme}
              itemList={itemList}
              render={({ text, attribute, style }) => {
                return (
                  <li>
                    <Link text={text} attribute={attribute} style={style} />
                  </li>
                );
              }}
            />
          </ul>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Drawer;
