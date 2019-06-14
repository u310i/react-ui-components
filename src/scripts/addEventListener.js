import { useEffect, useRef } from 'react';
import { createOptimizedEvent, testPassiveEventSupport } from 'scripts';

export const addEventListener = (target = document, type, callback, options = {}) => {
	const { optimized = true, enable = true, dependencies = [], ...listenerOptions } = options;
	const cancelRef = useRef(false);

	useEffect(() => {
		if (enable) {
			const passive = listenerOptions.passive;
			// passive option is true at default
			listenerOptions.passive = passive === undefined ? true : passive;
			const event = callback();
			const handle = optimized ? createOptimizedEvent(event, cancelRef) : event;
			target.addEventListener(
				type,
				handle,
				testPassiveEventSupport() ? listenerOptions : !!listenerOptions.capture
			);
		}
		return () => {
			if (enable) {
				target.removeEventListener(type, handle);
				cancelRef.current && cancelRef.current();
			}
		};
	}, dependencies);
};
