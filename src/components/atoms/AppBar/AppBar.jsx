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
} from 'utilities/utils';
import {
  setDisplayStateOnScrollEvent,
  setIsArrivedToElOnScrollEvent
} from 'utilities/windowEvents';
import { useAddWindowEvent } from 'utilities/effects';
import { useSetDomProperty } from 'utilities/layoutEffects';
import { useHasFirstElement } from 'utilities/hooks';

import List from 'atoms/List';

const name_hide = 'hide';
const name_transitionOnArrived = 'arrived';

const AppBar = ({
  propRef = {},
  parent = {},
  list = [],
  theme,
  options = {}
}) => {
  /*





  options
  */
  const { style: parentStyle = {} } = parent;
  console.log('app bar');
  const {
    style: propStyle = {},
    height = '3rem',
    timingFunction = 'ease-out',
    duration = 200,
    mode = 'static',
    hideOnScroll: {
      enable: hideOnScrollEnable = false,
      keepHeight: hideOnScrollKeepHeight = false,
      timingFunction: hideOnScrollTimingFunction = false,
      duration: hideOnScrollDuration = false
    },
    hideOnTarget: {
      enable: hideOnTargetEnable = true,
      target: hideOnTargetTarget = 'uc-footer',
      timingFunction: hideOnTargetTimingFunction = false,
      duration: hideOnTargetDuration = false
    },
    transitionOnArrived: {
      enable: transitionOnArrivedEnable = false,
      timingFunction: transitionOnArrivedTimingFunction = null,
      duration: transitionOnArrivedDuration = null,
      beforeStyle: transitionOnArrivedBeforeStyle = {},
      afterStyle: transitionOnArrivedAfterStyle = {}
    }
  } = options;
  /*


  hooks
  */
  const elRef = useRef(null);
  propRef = elRef;

  const [offsetTopState, setOffsetTopState] = useState(null);
  const [isArrivedState, setIsArrivedState] = useState(false);
  const [rowState, setRowState] = useState('show');

  /*





  Judgment
  */

  const hasElement = elRef.current !== null;
  const hasOffsetTop = offsetTopState !== null;

  const isFixed = mode === 'fixed',
    isAbsolute = mode === 'absolute',
    isStaticToFixed = mode === 'staticToFixed',
    isAbsoluteToFixed = mode === 'absoluteToFixed';

  const absoluteHasOffsetTop = isAbsolute && hasOffsetTop;
  const absoluteToFixedHasOffsetTop = isAbsoluteToFixed && hasOffsetTop;

  const canToFixed = isStaticToFixed || isAbsoluteToFixed;

  const shouldBeFixed =
    isFixed ||
    (isStaticToFixed && isArrivedState) ||
    (absoluteToFixedHasOffsetTop && isArrivedState);
  // console.log('isArrivedState:    ' + isArrivedState);
  const shouldBeAbsolute = absoluteHasOffsetTop || absoluteToFixedHasOffsetTop;

  // console.log('canToFixed:   ' + canToFixed);

  const canScrollHide =
    hideOnScrollEnable && (isFixed || isStaticToFixed || isAbsoluteToFixed);
  const shouldGetOffsetTop = isAbsolute || isAbsoluteToFixed || isStaticToFixed;
  // const targetElement = targetElement === 'footer';
  // const canHide = hideOnTargetIsNum || hideOnTargetIsEl;

  /*





  useEffect
  */
  console.warn(
    '-------------------------------------' + shouldGetOffsetTop &&
      !hasOffsetTop
  );
  useSetDomProperty(
    setOffsetTopState,
    elRef,
    'offsetTop',
    shouldGetOffsetTop && !hasOffsetTop,
    false,
    [options, hasOffsetTop]
  );

  //init isArrivedState
  useSetDomProperty(
    setIsArrivedState,
    elRef,
    'offsetTop',
    shouldGetOffsetTop && !hasOffsetTop,
    false,
    [options, hasOffsetTop],
    value => {
      const top = value ? value : 0;
      return window.pageYOffset > top ? true : false;
    }
  );

  useAddWindowEvent(
    'scroll',
    () => setIsArrivedToElOnScrollEvent(setIsArrivedState, offsetTopState),
    canToFixed && hasOffsetTop,
    [offsetTopState]
  );

  useAddWindowEvent(
    'scroll',
    () =>
      setDisplayStateOnScrollEvent(
        setRowState,
        elRef,
        (isFixed && hideOnScrollKeepHeight) || isStaticToFixed
      ),
    canScrollHide,
    [options]
  );
  // useGetRefsPropertyToRefs(elTopRef, elRef, 'offsetTop', canToFixed, [options]);

  // useAddWindowEvent(
  //   'resize',
  //   () =>
  //     callbackOnChangeBodyPropertyEvent(
  //       () => setOffsetTopState(null),
  //       'offsetHeight'
  //     ),
  //   shouldGetOffsetTop,
  //   [options, hasOffsetTop]
  // );
  // useAddWindowEvent(
  //   'resize',
  //   () => setSetRefsPropertyEvent(setOffsetTopState, elRef, 'offsetTop'),
  //   shouldGetOffsetTop,
  //   [options]
  // );

  /*





  style
  */
  const position =
    (shouldBeFixed && 'fixed') || (shouldBeAbsolute && 'absolute') || 'static';

  const top =
    (shouldBeFixed && '0') || (shouldBeAbsolute && offsetTopState) || 'auto';

  const left = (shouldBeFixed && '0') || (shouldBeAbsolute && '0') || 'auto';

  const componentStyle = {
    style: {},
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

  const hideOnScroll_d = hideOnScrollDuration || duration;
  const hideOnScroll_t = hideOnScrollTimingFunction || timingFunction;
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
    [hideOnScrollEnable]
  );

  const cancelHideOnScrollTransition = useMemo(
    () => {
      return rowState === 'quickly-show' && hideOnScrollEnable
        ? {
            transition: `transform 0ms linear`
          }
        : {};
    },
    [rowState, hideOnScrollEnable]
  );

  const hasFirstElement =
    canToFixed && transitionOnArrivedEnable
      ? useHasFirstElement(hasElement)
      : null;

  const transitionOnArrived_d = transitionOnArrivedDuration || duration;
  const transitionOnArrived_t =
    transitionOnArrivedTimingFunction || timingFunction;
  const transitionStyleOfArrived = useMemo(
    () => {
      if (transitionOnArrivedEnable) {
        const beforeOverlapStyle = extractOverlapObjectProperty(
          transitionOnArrivedAfterStyle,
          componentStyle.main.style
        );
        const beforeStyle = {
          ...beforeOverlapStyle,
          ...transitionOnArrivedBeforeStyle
        };
        const switchProperty = makeTransitionalProperty(beforeStyle);

        return genReactCSSTransitionStyle(name_transitionOnArrived, () => {
          return {
            enter: {
              ...beforeStyle
            },
            enterActive: {
              ...transitionOnArrivedAfterStyle,
              transitionProperty: switchProperty || 'all',
              transitionDuration: hasFirstElement
                ? '0ms'
                : `${transitionOnArrived_d}ms`,
              transitionTimingFunction: transitionOnArrived_t
            },
            exit: {
              ...transitionOnArrivedAfterStyle
            },
            exitActive: {
              ...beforeStyle,
              transitionProperty: switchProperty || 'all',
              transitionDuration: hasFirstElement
                ? '0ms'
                : `${transitionOnArrived_d}ms`,
              transitionTimingFunction: transitionOnArrived_t
            }
          };
        });
      }
    },
    [isAbsoluteToFixed, isStaticToFixed, hasFirstElement]
  );

  // console.log(elRef.current);
  // useEffect(() => {
  //   shouldHide;
  // });

  /*





  component
  */
  const shouldDummyElMount =
    (isFixed && hideOnScrollEnable && hideOnScrollKeepHeight) ||
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
  // || (hidable && shouldHide)
  return (
    <div className={cx(css(propStyle), 'uc-appbar')} ref={elRef}>
      <CSSTransition
        in={canToFixed && transitionOnArrivedEnable && isArrivedState}
        timeout={transitionOnArrived_d}
        classNames={name_transitionOnArrived}
      >
        <CSSTransition
          in={hideOnScrollEnable && rowState === 'hide'}
          timeout={hideOnScroll_d}
          classNames={name_hide}
        >
          <div
            className={cx(
              css({
                ...componentStyle.main.style,
                ...parentStyle,
                ...transitionStyleOfHideOnScroll,
                ...cancelHideOnScrollTransition,
                ...transitionStyleOfArrived
              }),
              'uc-appbar-main'
            )}
          >
            <List componentList={list} mode="component" />
          </div>
        </CSSTransition>
      </CSSTransition>

      {DummyEl}
    </div>
  );
};

export default AppBar;
