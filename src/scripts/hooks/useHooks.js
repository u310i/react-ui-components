import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useAddWindowEvent, useGetInitBreakpoint, setBreakpointOnResizeEvent } from 'scripts';

export const useSetBreakpoint = (breakpoints) => {
	const initValue = useMemo(() => {
		return useGetInitBreakpoint(breakpoints);
	}, []);
	const [ state, setState ] = useState(initValue);
	useAddWindowEvent('resize', () => setBreakpointOnResizeEvent(breakpoints, initValue, setState), true, []);
	return state;
};

export const useLateUpdate = (timeout) => {
	const [ lateUpdateStatus, update ] = useState(undefined);
	const timeoutId = useRef(null);

	const lateUpdate = useCallback(
		() => {
			if (timeoutId.current !== null) clearTimeout(timeoutId.current);
			timeoutId.current = setTimeout(() => {
				update(undefined);
				timeoutId.current = null;
			}, timeout);
			update((prev) => !prev);
		},
		[ timeout ]
	);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutId.current);
		};
	});

	return [ lateUpdateStatus, lateUpdate ];
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
