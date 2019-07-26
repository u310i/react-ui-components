import React from 'react';
import { useAddWindowEvent, useGetInitBreakpoint, setBreakpointOnResizeEvent } from 'scripts';

export const useSetBreakpoint = (breakpoints) => {
	const initValue = React.useMemo(() => {
		return useGetInitBreakpoint(breakpoints);
	}, []);
	const [ state, setState ] = React.useState(initValue);
	useAddWindowEvent('resize', () => setBreakpointOnResizeEvent(breakpoints, initValue, setState), true, []);
	return state;
};

export const useLateUpdate = (timeout) => {
	const [ lateUpdateStatus, update ] = React.useState(false);
	const timeoutId = React.useRef(null);

	const lateUpdate = React.useCallback(
		() => {
			if (timeoutId.current !== null) clearTimeout(timeoutId.current);
			timeoutId.current = setTimeout(() => {
				update(false);
				timeoutId.current = null;
			}, timeout);
			update((prev) => {
				return !prev || prev === 2 ? 1 : 2;
			});
		},
		[ timeout ]
	);

	React.useEffect(() => {
		return () => {
			clearTimeout(timeoutId.current);
		};
	});

	return [ lateUpdateStatus, lateUpdate ];
};

export const didMount = () => {
	const ref = React.useRef();
	const state = ref.current;

	if (typeof state === undefined) {
		ref.current = 1;
	} else if (state === 1) {
		ref.current = false;
	}

	return !!ref.current;
};

export const didFirstUpdate = () => {
	const ref = React.useRef();
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
