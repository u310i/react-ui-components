export const ownerDocument = (node) => {
	return (node && node.ownerDocument) || document;
};

export const ownerWindow = (node, fallback = window) => {
	const doc = ownerDocument(node);
	return doc.defaultView || doc.parentView || fallback;
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

export const clickedScrollbar = (event) => {
	return (
		document.documentElement.clientWidth <= event.clientX || document.documentElement.clientHeight <= event.clientY
	);
};
