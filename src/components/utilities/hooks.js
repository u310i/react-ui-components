import { useState, useRef, useCallback, useMemo } from 'react';
import { useAddWindowEvent } from 'utilities/effects';
import { setTwoBreakpointOnResizeEvent } from 'utilities/windowEvents';

export const setTwoBreakpoint = breakpoints => {
  const initBreakpoint = useGetInitTwoBreakpoint(
    breakpoints,
    setBreakpointState
  );
  const [breakpointState, setBreakpointState] = useState(initBreakpoint);
  useAddWindowEvent(
    'resize',
    () =>
      setTwoBreakpointOnResizeEvent(
        breakpoints,
        initBreakpoint,
        setBreakpointState
      ),
    true,
    []
  );
  return breakpointState;
};

export const useHasFirstElement = hasElement => {
  const prevHasElementRef = useRef();
  if (!hasElement) {
    prevHasElementRef.current = null;
  }
  let hasFirstElement;

  if (hasElement && prevHasElementRef.current === null) {
    prevHasElementRef.current = true;
    hasFirstElement = true;
  } else if (!hasElement && prevHasElementRef.current === true) {
    prevHasElementRef.current = null;
    hasFirstElement = null;
  } else {
    hasFirstElement = null;
  }
  return hasFirstElement;
};

export const useGetInitTwoBreakpoint = breakpoints => {
  const result = useMemo(() => {
    const { sm, lg } = breakpoints;
    const width = window.innerWidth,
      breakpoint = (width < sm && 'sm') || (width < lg && 'lg') || 'max';
    return breakpoint;
  }, []);

  return result;
};
