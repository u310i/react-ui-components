import { useState, useRef, useCallback, useMemo } from 'react';
import { useAddWindowEvent } from 'utilities/hooks/useEffects';
import { useGetInitBreakpoint } from 'utilities/breakpointUtils';
import { setBreakpointOnResizeEvent } from 'utilities/windowEvents';

export const useSetBreakpoint = breakpoints => {
  const initValue = useMemo(() => {
    return useGetInitBreakpoint(breakpoints);
  }, []);
  const [state, setState] = useState(initValue);
  useAddWindowEvent(
    'resize',
    () => setBreakpointOnResizeEvent(breakpoints, initValue, setState),
    true,
    []
  );
  return state;
};

export const useTimerWithToggle = timeout => {
  const [state, setState] = useState(undefined);
  const timeoutId = useRef(null);

  const setToggleState = useCallback(() => {
    if (timeoutId.current !== null) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setState(undefined);
      timeoutId.current = null;
    }, timeout);
    setState(prev => !prev);
  }, [timeout]);

  return [state, setToggleState];
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
