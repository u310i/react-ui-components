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

export const didMount = () => {
  const ref = useRef();
  const state = ref.current;

  if (typeof state === undefined) {
    ref.current = 1;
  } else if (state === 1) {
    ref.current = false;
  }

  return !!ref.current;
};

export const didFirstUpdate = () => {
  const ref = useRef();
  const state = ref.current;

  if (typeof state === undefined) {
    ref.current = 0;
  } else if (state === 0) {
    ref.current = 1;
  } else if (state === 1) {
    ref.current = false;
  }

  return !!ref.current;
};
