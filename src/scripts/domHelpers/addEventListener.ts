import { createOptimizedEvent } from '..';

// Safely detecting option support
// https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener
const passiveSupported = (() => {
	if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
		return;
	}

	let passive = false;

	const options = Object.defineProperty({}, 'passive', {
		get() {
			passive = true;
		}
	});

	const noop = () => {};

	window.addEventListener('testPassiveEventSupport', noop, options);
	window.removeEventListener('testPassiveEventSupport', noop, options);

	return passive;
})();

export const testPassiveEventSupport = () => passiveSupported;

const createListenerOptions = passiveSupported
	? (options) => {
			const passive = typeof options.passive === 'undefined' ? true : options.passive;
			return {
				...options,
				passive: passive
			};
		}
	: (options) => {
			return options.capture || {};
		};

export const addEventListener = (target, type, listener, options = {}, optimized = false) => {
	const optimizeClearlRef = {
		clear: null
	};
	const eventListener = optimized ? createOptimizedEvent(listener, optimizeClearlRef) : listener;

	const listenerOptions = createListenerOptions(options);
	target.addEventListener(type, eventListener, listenerOptions);

	return () => {
		optimizeClearlRef.clear && optimizeClearlRef.clear();
		target.removeEventListener(type, eventListener, listenerOptions);
	};
};
