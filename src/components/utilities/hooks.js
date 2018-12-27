import { useState, useRef, useCallback, useMemo } from 'react';
import { useAddWindowEvent } from 'utilities/effects';
import { setBreakpointOnResizeEvent } from 'utilities/windowEvents';

export const useSetTwoBreakpoint = breakpoints => {
  const initBreakpoint = useGetInitBreakpoint(breakpoints, setBreakpointState);
  const [breakpointState, setBreakpointState] = useState(initBreakpoint);
  useAddWindowEvent(
    'resize',
    () =>
      setBreakpointOnResizeEvent(
        breakpoints,
        initBreakpoint,
        setBreakpointState
      ),
    true,
    []
  );
  return breakpointState;
};

export const useGetInitBreakpoint = breakpoints => {
  const result = useMemo(() => {
    const { xs, sm, md, lg, xl } = breakpoints;
    const width = window.innerWidth;
    const breakpoint =
      (xs && width < xs && 'xs') ||
      (sm && width < sm && 'sm') ||
      (md && width < md && 'md') ||
      (lg && width < lg && 'lg') ||
      (xl && width < xl && 'xl') ||
      'max';
    return breakpoint;
  }, []);

  return result;
};

export const useIsSecondRendering = hasElement => {
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
