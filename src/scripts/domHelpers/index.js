import { isBoolean } from 'scripts';

import focusTrap from './focusTrap';
import mousetrap from 'mousetrap';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export { focusTrap };
export { mousetrap };
export const scrollLock = {
	lock: disableBodyScroll,
	restore: enableBodyScroll,
	clearAll: clearAllBodyScrollLocks
};

export const ownerDocument = (node) => {
	return (node && node.ownerDocument) || document;
};

export const ownerWindow = (node, fallback = window) => {
	const doc = ownerDocument(node);
	return doc.defaultView || doc.parentView || fallback;
};

export const clickedScrollbar = (event) => {
	return (
		document.documentElement.clientWidth <= event.clientX || document.documentElement.clientHeight <= event.clientY
	);
};

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
			const passive = options.passive;
			options.passive = passive === undefined ? true : passive;
			return options;
		}
	: (options) => {
			!!options.capture;
		};

export const addEventListener = (target, type, callback, options = {}) => {
	const listenerOptions = isBoolean(options) ? options : createListenerOptions(options);
	target.addEventListener(type, callback, listenerOptions);
};

export const removeEventListener = (target, type, callback, options = false) => {
	const capture = isBoolean(options) ? options : !!options.capture;
	target.removeEventListener(type, callback, capture);
};

export const getTransitionEndName = (() => {
	const transitions = {
		transition: 'transitionend',
		WebkitTransition: 'webkitTransitionEnd',
		MozTransition: 'transitionend',
		OTransition: 'oTransitionEnd otransitionend'
	};
	const testElementStyle = document.body.style;
	let transitionEndName = false;
	for (let t of Object.keys(transitions)) {
		if (testElementStyle[t] !== undefined) {
			transitionEndName = transitions[t];
			break;
		}
	}
	return () => transitionEndName;
})();

export const getNode = (value) => {
	if (!value) {
		return null;
	}
	const node =
		value.current ||
		(typeof value === 'function' && value()) ||
		(typeof value === 'string' && document.querySelector(value)) ||
		value;

	return node;
};

export const getElementRef = (ref, element) => {
	if (ref) {
		typeof ref === 'function' ? ref(element) : (ref.current = element);
	}
};
