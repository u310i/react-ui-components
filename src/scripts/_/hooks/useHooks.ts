import React from 'react';
import {} from '..';

// export const useSetBreakpoint = (breakpoints) => {
// 	const initValue = React.useMemo(() => {
// 		return useGetInitBreakpoint(breakpoints);
// 	}, []);
// 	const [ state, setState ] = React.useState(initValue);
// 	useAddWindowEvent('resize', () => setBreakpointOnResizeEvent(breakpoints, initValue, setState), true, []);
// 	return state;
// };

export const useForceUpdate = (() => React.useState()[1]) as () => () => void;

export const useLateUpdate = (timeout: number) => {
  const [lateUpdateStatus, update] = React.useState(0);
  const timeoutId = React.useRef<null | number>(null);

  const lateUpdate = React.useCallback(() => {
    if (timeoutId.current !== null) clearTimeout(timeoutId.current);
    timeoutId.current = window.setTimeout(() => {
      update(0);
      timeoutId.current = null;
    }, timeout);
    update(prev => {
      return !prev || prev === 2 ? 1 : 2;
    });
  }, [timeout]);

  React.useEffect(() => {
    return () => {
      timeoutId.current && clearTimeout(timeoutId.current);
    };
  });

  return [lateUpdateStatus, lateUpdate];
};
