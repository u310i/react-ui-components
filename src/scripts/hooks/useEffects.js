import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import {
	genUniqueId,
	createOptimizedEvent,
	testPassiveEventSupport,
	addEventListener,
	removeEventListener
} from 'scripts';

export const useAddEventListener = (target = document, type, callback, options = {}) => {
	const { optimized = true, enable = true, dependencies = [], ...listenerOptions } = options;
	const cancelRef = useRef(false);

	useEffect(() => {
		if (enable) {
			const event = callback();
			const handle = optimized ? createOptimizedEvent(event, cancelRef) : event;
			addEventListener(target, type, handle, listenerOptions);
		}
		return () => {
			if (enable) {
				target && target.removeEventListener(type, handle, listenerOptions);
				cancelRef.current && cancelRef.current();
			}
		};
	}, dependencies);
};

export const useDidUpdate = (fn, dependencies) => {
	const isMount = useRef(true).current;
	let cleanup;
	useEffect(() => {
		if (isMount) {
			isMount = false;
		} else {
			cleanup = fn();
		}
		return () => {
			if (cleanup) {
				cleanup();
			}
		};
	}, dependencies);
};

export const useIntersectionObserver = (elRef, callback, option, enable, dependencies) => {
	useEffect(() => {
		if (enable && elRef.current) {
			let observer = new IntersectionObserver((changes) => {
				for (let change of changes) {
					callback(change);
				}
			}, option);

			if (Array.isArray(elRef)) {
				elRef.forEach((el) => observer.observe(el.current));
			} else {
				observer.observe(elRef.current);
			}
		}

		return;
	}, dependencies);
};

// Safely detecting option support
// https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener
// let passiveSupported = false;
// try {
//   const options = Object.defineProperty({}, 'passive', {
//     get: function() {
//       passiveSupported = true;
//     }
//   });

//   window.addEventListener('test', options, options);
//   window.removeEventListener('test', options, options);
// } catch (err) {
//   passiveSupported = false;
// }

export const useAddWindowEvent = (
	type,
	callback,
	// options = {},
	enable = true,
	dependencies = [],
	optimized = true
) => {
	let handle;
	const rafHandleRef = useRef(false);
	useEffect(() => {
		if (enable) {
			const event = callback();
			handle = (optimized && createOptimizedEvent(event, rafHandleRef)) || event;
			window.addEventListener(type, handle);
			// window.addEventListener(
			//   type,
			//   handle,
			//   passiveSupported ? options : options.capture ? true : false
			// );
		}
		return () => {
			if (enable) {
				window.removeEventListener(type, handle);
				rafHandleRef.current && rafHandleRef.current();
			}
		};
	}, dependencies);
};

export const useAddCssInBody = (name, state, styleCallback) => {
	const uniqueId = useRef(`${name}_${genUniqueId()}`);
	useEffect(() => {
		const head = document.head;
		const style = `
      body.body-${uniqueId.current} {
        ${styleCallback()}
      }
    `;
		const styleNode = document.createElement('style');
		const cssText = document.createTextNode(style);
		styleNode.setAttribute('id', `body-${uniqueId.current}`);
		styleNode.appendChild(cssText);
		head.prepend(styleNode);
		return () => {
			const removeNode = document.getElementById(`body-${uniqueId.current}`);
			if (removeNode) {
				removeNode.remove();
			}
		};
	}, []);

	useEffect(
		() => {
			const body = document.body;
			if (state) {
				body.classList.add(`body-${uniqueId.current}`);
			} else {
				body.classList.remove(`body-${uniqueId.current}`);
			}
			return () => {
				body.classList.remove(`body-${uniqueId.current}`);
			};
		},
		[ state ]
	);
};
