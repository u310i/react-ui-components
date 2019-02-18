import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useMemo
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { css, cx } from 'react-emotion';

import {
  genReactCSSTransitionStyle,
  extractOverlapObjectProperty,
  makeTransitionalProperty
} from 'scripts';
import {
  getDisplayStateOnScrollEvent,
  getIsArrivedToElOnScrollEvent
} from 'scripts';
import { useAddWindowEvent, useIntersectionObserver } from 'scripts';
import { useGetDomProperty } from 'scripts';
import { useIsSecondRendering } from 'scripts';

import List from 'components/List';

const name_hide = 'hide';
const name_transitionOnArrived = 'arrived';

const AppBar = ({
  parentRef = null,
  parentProps = {},
  list = [],
  theme,
  options = {}
}) => {
  /*


  options
  */
  const { style: parentStyle = {} } = parentProps;
  const {
    style: propStyle = {},
    height = '3rem',
    timingFunction = 'ease-out',
    duration = 200,
    mode = 'static',
    fixedToBottom = false,
    hideOnScroll: {
      enable: hideOnScroll_enable = false,
      keepHeight: hideOnScroll_keepHeight = false,
      timingFunction: hideOnScroll_timingFunction = false,
      duration: hideOnScroll_duration = false
    },
    transitionOnArrived: {
      enable: transitionOnArrived_enable = false,
      timingFunction: transitionOnArrived_timingFunction = null,
      duration: transitionOnArrived_duration = null,
      beforeStyle: transitionOnArrived_beforeStyle = {},
      afterStyle: transitionOnArrived_afterStyle = {}
    }
  } = options;
  /*




  hooks
  */
  const elRef = useRef(null);
  parentRef = elRef;

  const isArrivedOnFirst = useRef(false);
  const [isArrivedState, setIsArrivedState] = useState(false);
  const isPrevArrived = useRef(null);
  isPrevArrived.current = isArrivedState;
  const [rowState, setRowState] = useState('show');

  const setArrivedStateOnFirst = () => {
    if (!isArrivedOnFirst.current) {
      isArrivedOnFirst.current = true;
    }
    setIsArrivedState(true);
  };

  const setArrivedStateOnScroll = flag => {
    if (isArrivedOnFirst.current) {
      isArrivedOnFirst.current = false;
    }
    setIsArrivedState(flag);
  };

  useMemo(
    () => {
      if (rowState !== 'show') {
        setRowState('show');
      }
      if (isArrivedState !== false) {
        setIsArrivedState(false);
      }
    },
    [options]
  );
  /*





  Judgment
  */
  const isFixed = mode === 'fixed',
    isAbsolute = mode === 'absolute',
    isStaticToFixed = mode === 'staticToFixed',
    isAbsoluteToFixed = mode === 'absoluteToFixed';

  const shouldBeBottom = mode === 'fixed' && fixedToBottom;

  const canGetArrivedState =
    !shouldBeBottom && (isStaticToFixed || isAbsoluteToFixed);

  const shouldBeAbsolute =
    !shouldBeBottom && (isAbsolute || (isAbsoluteToFixed && !isArrivedState));

  const shouldBeFixed =
    isFixed ||
    (isStaticToFixed && isArrivedState) ||
    (isAbsoluteToFixed && isArrivedState);

  const canScrollHide =
    !shouldBeBottom &&
    !transitionOnArrived_enable &&
    hideOnScroll_enable &&
    (isFixed || isStaticToFixed || isAbsoluteToFixed);

  const canTransitionStyle =
    !shouldBeBottom &&
    !hideOnScroll_enable &&
    transitionOnArrived_enable &&
    (isStaticToFixed || isAbsoluteToFixed);
  /*





  useEffect
  */
  useGetDomProperty(
    elRef,
    'offsetTop',
    value => {
      const offsetTop = value ? value : 0;
      if (window.pageYOffset > offsetTop) {
        setArrivedStateOnFirst();
      }
    },
    canGetArrivedState,
    [options]
  );

  useAddWindowEvent(
    'scroll',
    () =>
      getIsArrivedToElOnScrollEvent(elRef, flag => {
        if (isPrevArrived.current !== flag) {
          setArrivedStateOnScroll(flag);
        }
      }),
    canGetArrivedState,
    [options]
  );

  useAddWindowEvent(
    'scroll',
    () =>
      getDisplayStateOnScrollEvent(
        elRef,
        (isFixed && hideOnScroll_keepHeight) || isStaticToFixed,
        state => {
          setRowState(state);
        }
      ),
    canScrollHide,
    [options]
  );

  /*





  style
  */
  const position =
    (shouldBeFixed && 'fixed') || (shouldBeAbsolute && 'absolute') || 'static';

  const top =
    (shouldBeFixed && !shouldBeBottom ? '0' : 'auto') ||
    (shouldBeAbsolute && '0') ||
    'auto';
  const bottom = shouldBeFixed && shouldBeBottom ? '0' : 'auto';
  const left = (shouldBeFixed && '0') || (shouldBeAbsolute && '0') || 'auto';

  const componentStyle = {
    style: {
      position: (shouldBeAbsolute && 'relative') || 'static'
    },
    main: {
      style: {
        backgroundColor: '#333',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: height,
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        width: '100%',
        zIndex: theme.zIndex.appBar,
        position: position,
        top: top,
        bottom: bottom,
        left: left
      }
    },
    dummy: {
      style: {
        opacity: '0',
        height: height,
        width: '100%'
      }
    }
  };

  const hideOnScroll_d = hideOnScroll_duration || duration;
  const hideOnScroll_t = hideOnScroll_timingFunction || timingFunction;
  const transitionStyleOfHideOnScroll = useMemo(
    () => {
      return genReactCSSTransitionStyle(name_hide, () => {
        return {
          enter: {
            transform: `translate3d(0,0,0)`
          },
          enterActive: {
            transform: `translate3d(0,-100%,0)`,
            transition: `transform ${hideOnScroll_d}ms ${hideOnScroll_t}`
          },
          exit: {
            transform: `translate3d(0,-100%,0)`
          },
          exitActive: {
            transform: `translate3d(0,0,0)`,
            transition: `transform ${hideOnScroll_d}ms ${hideOnScroll_t}`
          }
        };
      });
    },
    [hideOnScroll_enable]
  );

  const cancelHideOnScrollTransition = useMemo(
    () => {
      return hideOnScroll_enable && rowState === 'quickly-show'
        ? {
            transition: `transform 0ms linear`
          }
        : {};
    },
    [options, rowState]
  );

  const transitionOnArrived_d = transitionOnArrived_duration || duration;
  const transitionStyleOfArrived = useMemo(
    () => {
      if (canTransitionStyle) {
        const transitionOnArrived_t =
          transitionOnArrived_timingFunction || timingFunction;
        const beforeOverlapStyle = extractOverlapObjectProperty(
          transitionOnArrived_afterStyle,
          { ...componentStyle.main.style, ...propStyle }
        );
        const beforeStyle = {
          ...beforeOverlapStyle,
          ...transitionOnArrived_beforeStyle
        };
        const transitionProperty = makeTransitionalProperty(beforeStyle);

        return genReactCSSTransitionStyle(name_transitionOnArrived, () => {
          return {
            enter: {
              ...beforeStyle
            },
            enterActive: {
              ...transitionOnArrived_afterStyle,
              transitionProperty: transitionProperty || 'all',
              transitionDuration: isArrivedOnFirst.current
                ? '0ms'
                : `${transitionOnArrived_d}ms`,
              transitionTimingFunction: transitionOnArrived_t
            },
            exit: {
              ...transitionOnArrived_afterStyle
            },
            exitActive: {
              ...beforeStyle,
              transitionProperty: transitionProperty || 'all',
              transitionDuration: isArrivedOnFirst.current
                ? '0ms'
                : `${transitionOnArrived_d}ms`,
              transitionTimingFunction: transitionOnArrived_t
            }
          };
        });
      } else {
        return {};
      }
    },
    [options, isArrivedOnFirst.current]
  );

  const componentStyleMain = {
    ...componentStyle.main.style,
    ...parentStyle,
    ...transitionStyleOfHideOnScroll,
    ...cancelHideOnScrollTransition,
    ...transitionStyleOfArrived
  };

  /*





  component
  */
  const shouldDummyElMount =
    (isFixed && shouldBeBottom) ||
    (isFixed && hideOnScroll_enable && hideOnScroll_keepHeight) ||
    (isStaticToFixed && isArrivedState);
  const DummyEl = useMemo(
    () => {
      return (
        shouldDummyElMount && (
          <div
            className={cx(css(componentStyle.dummy.style), 'uc-appbar-dummy')}
          />
        )
      );
    },
    [options, isArrivedState]
  );

  return (
    <div
      className={cx(css(componentStyle.style), css(propStyle), 'uc-appbar')}
      ref={elRef}
    >
      <CSSTransition
        in={canTransitionStyle && isArrivedState}
        timeout={transitionOnArrived_d}
        classNames={name_transitionOnArrived}
      >
        <CSSTransition
          in={hideOnScroll_enable && rowState === 'hide'}
          timeout={hideOnScroll_d}
          classNames={name_hide}
        >
          <div className={cx(css(componentStyleMain), 'uc-appbar-main')}>
            <List componentList={list} mode="component" />
          </div>
        </CSSTransition>
      </CSSTransition>

      {DummyEl}
    </div>
  );
};

export default AppBar;
