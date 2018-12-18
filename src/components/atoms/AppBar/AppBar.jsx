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
  createSetDisplayStateOnScroll,
  createSetArrivedStateOnScroll,
  extractOverlapObjectProperty,
  makeTransitionProperty
} from 'utilities/utils';
import { useAddWindowEvent, useHasFirstElement } from 'utilities/hooks';

import List from 'atoms/List';

const hideName = 'hide';
const changeStyleName = 'change';

const AppBar = ({
  propRef = {},
  parent = {},
  list = [],
  theme,
  options = {}
}) => {
  const elRef = useRef(null);
  const [rowState, setRowState] = useState('show');
  const [arrivedState, setArrivedState] = useState(false);
  const [elTopState, setElTopState] = useState(null);

  const { style: parentStyle = {} } = parent;
  propRef = elRef;

  const {
    style: propStyle = {},
    height = '3rem',
    timingFunction = 'ease-out',
    duration = 200,
    mode = 'static',
    hideOnScroll = false,
    keepHeight = false,
    hidable = false,
    hidePoint = -100,
    changeable = false,
    changeableStyle = {}
  } = options;
  const isFixed = mode === 'fixed',
    isAbsolute = mode === 'absolute',
    isStaticToFixed = mode === 'staticToFixed',
    isAbsoluteToFixed = mode === 'absoluteToFixed',
    hasElement = elRef.current !== null,
    isAbsoluteHasEl = isAbsolute && hasElement,
    isAbsoluteToFixedHasEl = isAbsoluteToFixed && hasElement,
    isArrivedStaticToFixed = isStaticToFixed && arrivedState,
    isArrivedAbsoluteToFixed = isAbsoluteToFixedHasEl && arrivedState;

  /*





  style
  */
  const position =
    ((isFixed || isArrivedStaticToFixed || isArrivedAbsoluteToFixed) &&
      'fixed') ||
    ((isAbsoluteHasEl || isAbsoluteToFixedHasEl) && 'absolute') ||
    'static';

  const top =
    ((isFixed || isArrivedStaticToFixed || isArrivedAbsoluteToFixed) && '0') ||
    ((isAbsoluteHasEl || isAbsoluteToFixedHasEl) && elTopState) ||
    'auto';

  const left =
    ((isFixed || isArrivedStaticToFixed || isArrivedAbsoluteToFixed) && '0') ||
    ((isAbsoluteHasEl || isAbsoluteToFixedHasEl) && '0') ||
    'auto';

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

  const hideBarTransitionStyle = useMemo(() => {
    return genReactCSSTransitionStyle(hideName, () => {
      return {
        enter: {
          transform: `translate3d(0,0,0)`
        },
        enterActive: {
          transform: `translate3d(0,-100%,0)`,
          transition: `transform ${duration}ms ${timingFunction}`
        },
        exit: {
          transform: `translate3d(0,-100%,0)`
        },
        exitActive: {
          transform: `translate3d(0,0,0)`,
          transition: `transform ${duration}ms ${timingFunction}`
        }
      };
    });
  }, []);

  const cancelHideBarTransition = useMemo(
    () => {
      return rowState === 'quickly-show' && hideOnScroll
        ? {
            transition: `transform 0ms linear`
          }
        : {};
    },
    [rowState, hideOnScroll]
  );

  const hasFirstElement =
    isAbsoluteToFixed && changeable ? useHasFirstElement(hasElement) : null;
  const changeTransitionStyle = useMemo(
    () => {
      if (changeable) {
        const beforeOverlapStyle = extractOverlapObjectProperty(
          changeableStyle.after,
          componentStyle.main.style
        );
        const beforeStyle = {
          ...beforeOverlapStyle,
          ...changeableStyle.before
        };
        const changeProperty = makeTransitionProperty(beforeStyle);

        return genReactCSSTransitionStyle(changeStyleName, () => {
          return {
            enter: {
              ...beforeStyle
            },
            enterActive: {
              ...changeableStyle.after,
              transitionProperty: changeProperty || 'all',
              transitionDuration: hasFirstElement ? '0ms' : `${duration}ms`,
              transitionTimingFunction: timingFunction
            },
            exit: {
              ...changeableStyle.after
            },
            exitActive: {
              ...beforeStyle,
              transitionProperty: changeProperty || 'all',
              transitionDuration: hasFirstElement ? '0ms' : `${duration}ms`,
              transitionTimingFunction: timingFunction
            }
          };
        });
      }
    },
    [isAbsoluteToFixed, isStaticToFixed, hasFirstElement]
  );

  /*





  useEffect
  */
  useAddWindowEvent(
    'scroll',
    () => createSetArrivedStateOnScroll(setArrivedState, elRef),
    isStaticToFixed || isAbsoluteToFixed
  );

  useAddWindowEvent(
    'scroll',
    () =>
      createSetDisplayStateOnScroll(
        setRowState,
        elRef,
        (isFixed && keepHeight) || isStaticToFixed
      ),
    hideOnScroll && (isFixed || isStaticToFixed || isAbsoluteToFixed)
  );

  useEffect(
    () => {
      if (isAbsolute || isAbsoluteToFixed) {
        const top = elRef.current.offsetTop;
        setElTopState(top);
      }
      return () => {
        if (ElTopExists) {
          setElTopState(null);
        }
      };
    },
    [mode]
  );

  /*





  component
  */
  const shouldDummyElMount =
    (isFixed && hideOnScroll && keepHeight) ||
    (isStaticToFixed && arrivedState);
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
    [hideOnScroll, arrivedState]
  );

  return (
    <div className={cx(css(propStyle), 'uc-appbar')}>
      <CSSTransition
        in={
          (isAbsoluteToFixed || isStaticToFixed) && changeable && arrivedState
        }
        timeout={duration}
        classNames={changeStyleName}
      >
        <CSSTransition
          in={(hideOnScroll && rowState === 'hide') || (hidable && shouldHide)}
          timeout={duration}
          classNames={hideName}
        >
          <div
            ref={elRef}
            className={cx(
              css({
                ...componentStyle.main.style,
                ...parentStyle,
                ...hideBarTransitionStyle,
                ...cancelHideBarTransition,
                ...changeTransitionStyle
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
