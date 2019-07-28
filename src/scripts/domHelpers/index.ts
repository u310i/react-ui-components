import { createOptimizedEvent } from '..';

import focusTrap from './focusTrap';
import mousetrap from 'mousetrap';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { testPassiveEventSupport, addEventListener } from './addEventListener';

export { focusTrap };
export { mousetrap };
export const scrollLock = {
	lock: disableBodyScroll,
	restore: enableBodyScroll,
	clearAll: clearAllBodyScrollLocks
};
export { testPassiveEventSupport, addEventListener };

export const ownerDocument = (node) => {
	return (node && node.ownerDocument) || document;
};

export const ownerWindow = (node, fallback = window) => {
	const doc = ownerDocument(node);
	return doc.defaultView || doc.parentView || fallback;
};

export const clickedScrollbar = (event) => {
	if (!event.clientX || !event.clientY) return;
	return (
		document.documentElement.clientWidth <= event.clientX || document.documentElement.clientHeight <= event.clientY
	);
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

type Refer<T> =
	| {
			current: null | T;
		}
	| ((element: T) => void);

export const getElementRef = <T extends {}>(ref: Refer<T>, element: T) => {
	if (ref) {
		typeof ref === 'function' ? ref(element) : (ref.current = element);
	}
};
