import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from 'react';
import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group';
import { css, cx } from 'emotion';
import { genUniqueId, genReactCSSTransitionStyle } from 'utilities/utils';
import { useAddCssInBody } from 'utilities/effects';
import Link from 'atoms/Link';
import IconButton from 'atoms/IconButton';

import List from 'atoms/List';

const name = 'drawer';

const Drawer = ({
  forwardRef = null,
  parentProps = {},
  theme,
  options = {},
  list,
  onClose,
  state,
  rootElement
}) => {
  const { style: parentStyle = {} } = parentProps;
  const {
    style: propStyle = {},
    direction = 'right',
    duration = 150,
    timingFunction = 'ease-out',
    closable = true,
    button,
    mask = true,
    maskClosable = true,
    maskOpacity = 0.3,
    maskStyle = {},
    shiftScrollBarWidth = true,
    width = '256px',
    height = '100%',
    zIndex = theme.zIndex.drawer
  } = options;

  const componentStyle = {
    mask: {
      style: {
        display: 'none',
        display: 'block',
        pointerEvents: state === 'close' ? 'none' : 'auto',
        cursor: state === 'close' ? 'auto' : maskClosable ? 'pointer' : 'auto',
        position: 'fixed',
        zIndex: theme.zIndex.appBar + 1,
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'black',
        ...maskStyle
      }
    },
    main: {
      style: {
        [direction]: '0',
        display: 'block',
        zIndex: zIndex,
        position: 'fixed',
        padding: '0',
        top: '0',
        width: width,
        height: height
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
          '& > .uc-drawer-main-list-item': {
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

  const transitionStyle = useMemo(() => {
    return genReactCSSTransitionStyle(name, () => {
      const x = direction === 'left' ? '-100%' : '100%';
      const opacity = (mask && maskOpacity) || 0;
      return {
        defaultStyle: {
          '& > .uc-drawer-main': {
            transform: `translate3d(${state === 'close' ? x : 0},0,0)`
          },
          '& > .uc-drawer-mask': {
            opacity: state === 'close' ? 0 : opacity
          }
        },
        enter: {
          '& > .uc-drawer-main': {
            transform: `translate3d(${x},0,0)`
          },
          '& > .uc-drawer-mask': {
            opacity: '0'
          }
        },
        enterActive: {
          '& > .uc-drawer-main': {
            transform: 'translate3d(0,0,0)',
            transition: `transform ${duration}ms ${timingFunction}`
          },
          '& > .uc-drawer-mask': {
            opacity: opacity,
            transition: `opacity ${duration}ms ${timingFunction}`
          }
        },
        exit: {
          '& > .uc-drawer-main': {
            transform: 'translate3d(0,0,0)'
          },
          '& > .uc-drawer-mask': {
            opacity: opacity
          }
        },
        exitActive: {
          '& > .uc-drawer-main': {
            transform: `translate3d(${x},0,0)`,
            transition: `transform ${duration}ms ${timingFunction}`
          },
          '& > .uc-drawer-mask': {
            opacity: '0',
            transition: `opacity ${duration}ms ${timingFunction}`
          }
        }
      };
    });
  }, []);

  useAddCssInBody(name, state === 'open', () => {
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    return `
      overflow: hidden;
      ${
        shiftScrollBarWidth
          ? `margin-${
              direction === 'right' ? 'right' : 'left'
            }: ${scrollBarWidth}px`
          : ''
      }
    `;
  });

  const listItem = useMemo(() => {
    return ({ text, attribute, style }) => (
      <li className={cx('uc-drawer-main-list-item')}>
        <Link text={text} attribute={attribute} style={style} />
      </li>
    );
  }, []);

  const Component = (
    <CSSTransition in={state === 'open'} timeout={duration} classNames={name}>
      <div
        ref={forwardRef}
        className={cx(
          css({
            ...componentStyle,
            ...parentStyle,
            ...propStyle,
            ...transitionStyle
          }),
          'uc-drawer'
        )}
      >
        <div
          onClick={maskClosable && onClose}
          className={cx(css(componentStyle.mask.style), 'uc-drawer-mask')}
        />
        <div className={cx(css(componentStyle.main.style), 'uc-drawer-main')}>
          <div
            className={cx(
              css(componentStyle.main.header.style),
              'uc-drawer-main-header'
            )}
          >
            {closable && (
              <IconButton
                icon={button.icon}
                options={button.options}
                onClick={onClose}
              />
            )}
          </div>
          <ul
            className={cx(
              css(componentStyle.main.list.style),
              'uc-drawer-main-list'
            )}
          >
            <List
              theme={theme}
              propList={list}
              render={listItem}
              mode="render"
            />
          </ul>
        </div>
      </div>
    </CSSTransition>
  );

  return rootElement
    ? ReactDOM.createPortal(Component, rootElement)
    : Component;
};

export default Drawer;
