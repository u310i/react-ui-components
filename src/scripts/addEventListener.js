import { useEffect, useRef } from 'react';
import { createOptimizedEvent } from 'scripts';

// Safely detecting option support
// https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener
let passiveSupported = false;
try {
	const options = Object.defineProperty({}, 'passive', {
		get: function() {
			passiveSupported = true;
		}
	});

	window.addEventListener('test', options, options);
	window.removeEventListener('test', options, options);
} catch (err) {
	passiveSupported = false;
}

export const addEventListener = (target = document, type, callback, options = {}) => {
	const { optimized = true, enable = true, dependencies = [], ...listenerOptions } = options;
	let handle;
	const cancelRef = useRef(false);

	useEffect(() => {
		if (enable) {
			const event = callback();
			handle = optimized ? createOptimizedEvent(event, cancelRef) : event;
			target.addEventListener(type, handle, passiveSupported ? listenerOptions : !!listenerOptions.capture);
		}
		return () => {
			if (enable) {
				target.removeEventListener(type, handle);
				cancelRef.current && cancelRef.current();
			}
		};
	}, dependencies);
};
