import React, {
  useState,
  useEffect,
  useLayoutEffect,
  React.useCallback,
  useRef,
  useMemo
} from 'react';

import { css, cx } from 'react-emotion';
import { getIsArrivedToElOnScrollEvent } from 'scripts';
import { useAddWindowEvent } from 'scripts';
import { useGetDomProperties } from 'scripts';
// import { useSetVerticalState } from '.utils';

import Dummy from 'components/Dummy';
import List from 'components/List';
import ScrollDown from './transitions/ScrollDown';
import Scrolling from './transitions/Scrolling';

const AppBar = ({
  list = [],
  style: propStyle = {},
  height = '3rem',
  mode = 'static',
  actionMode,
  action: { duration = 200, timingFunction = 'ease-out', scrollDown, scrolling }
}) => {
  const elRef = useRef(null);
  const [isArrivedState, setIsArrivedState] = useState(false);

  const {
    isFixed,
    isAbsolute,
    isStaticToFixed,
    isAbsoluteToFixed,
    isBottom,
    isScrollDown,
    isScrolling
  } = useMemo(() => {
    return {
      isFixed: mode === 'fixed',
      isAbsolute: mode === 'absolute',
      isStaticToFixed: mode === 'staticToFixed',
      isAbsoluteToFixed: mode === 'absoluteToFixed',
      isBottom: mode === 'bottom',
      isScrollDown: actionMode === 'scrollDown',
      isScrolling: actionMode === 'scrolling'
    };
  });

  const { needArrivedState, needVerticalValue, needDummy } = useMemo(() => {
    return {
      needArrivedState: isStaticToFixed || isAbsoluteToFixed,
      needVerticalValue: (isStaticToFixed && isScrollDown) || isBottom,
      needDummy: isStaticToFixed || (isBottom && !isScrollDown)
    };
  }, []);

  const hasEl = !!elRef.current;

  const { shouldBeAbsolute, shouldBeFixed } = useMemo(() => {
    return {
      shouldBeAbsolute: isAbsolute || (isAbsoluteToFixed && !isArrivedState),
      shouldBeFixed:
        isFixed ||
        (isBottom && hasEl) ||
        (isStaticToFixed && isArrivedState) ||
        (isAbsoluteToFixed && isArrivedState)
    };
  }, [hasEl, isArrivedState]);

  const actionProps = useMemo(() => {
    return (isScrollDown && scrollDown) || (isScrolling && scrolling);
  }, []);

  const verticalState = useGetDomProperties(
    elRef,
    ['offsetTop', 'offsetHeight'],
    (prev, value) => value,
    needVerticalValue,
    []
  );

  useAddWindowEvent(
    'scroll',
    () =>
      getIsArrivedToElOnScrollEvent(elRef, isArrived => {
        setIsArrivedState(isArrived);
      }),
    needArrivedState,
    []
  );

  const componentStyle = useMemo(() => {
    return {
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
          zIndex: 1100
        }
      }
    };
  }, []);

  useMemo(() => {
    componentStyle.style['position'] =
      (shouldBeAbsolute && 'relative') || 'static';
    componentStyle.main.style['position'] =
      (shouldBeFixed && 'fixed') ||
      (shouldBeAbsolute && 'absolute') ||
      'static';

    componentStyle.main.style['top'] =
      (shouldBeFixed && !isBottom ? '0' : 'auto') ||
      (shouldBeAbsolute && '0') ||
      'auto';
    componentStyle.main.style['bottom'] =
      shouldBeFixed && isBottom ? '0' : 'auto';
    componentStyle.main.style['left'] =
      ((shouldBeFixed || shouldBeAbsolute) && '0') || 'auto';
  }, [hasEl, isArrivedState]);

  const style = {
    ...componentStyle.main.style,
    ...propStyle
  };

  const createAppBar = useMemo(() => {
    return style => (
      <div className={cx(css(style), 'uc-appbar-main')}>
        {/* <List componentList={list} mode="component" /> */}
        test
      </div>
    );
  }, []);

  let Component;
  if (isScrollDown) {
    Component = (
      <ScrollDown
        enable={shouldBeFixed}
        innerHoc={createAppBar}
        style={style}
        keepHeight={
          needVerticalValue &&
          verticalState &&
          verticalState.offsetTop + verticalState.offsetHeight
        }
        isBottom={isBottom}
        duration={duration}
        timingFunction={timingFunction}
        {...actionProps}
      />
    );
  } else if (isScrolling) {
    Component = (
      <Scrolling
        enable={shouldBeFixed}
        innerHoc={createAppBar}
        style={style}
        duration={duration}
        timingFunction={timingFunction}
        {...actionProps}
      />
    );
  } else {
    Component = createAppBar(style);
  }

  const DummyComponent = useMemo(() => {
    if (needDummy && verticalState.offsetHeight) {
      const style = { height: `${verticalState.offsetHeight}px` };
      const container = isBottom && document.getElementById('bottom');
      return (
        <Dummy
          container={container}
          style={style}
          className="uc-appbar-dummy"
        />
      );
    }
  }, [hasEl]);

  return (
    <div className={cx(css(componentStyle.style), 'uc-appbar')} ref={elRef}>
      {Component}
      {(isArrivedState || isBottom) && DummyComponent}
    </div>
  );
};

export default AppBar;
