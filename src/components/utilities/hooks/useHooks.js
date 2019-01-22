import { useState, useRef, useCallback, useMemo } from 'react';
import { useAddWindowEvent } from 'utilities/hooks/useEffects';
import { useGetInitBreakpoint } from 'utilities/breakpointUtils';
import { setBreakpointOnResizeEvent } from 'utilities/windowEvents';

export const useSetBreakpoint = breakpoints => {
  const initBreakpoint = useMemo(() => {
    return useGetInitBreakpoint(breakpoints);
  });
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
