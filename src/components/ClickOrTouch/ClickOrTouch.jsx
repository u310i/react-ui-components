import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import $ from './_constants';
import { testPassiveEventSupport } from 'scripts';
import {} from '..';

const $names = $.names;

const ClickOrTouch = ({ children, target = document, action, types = [ 'touchstart', 'mousedown' ], options = {} }) => {
	const existTouchEventRef = useRef(false);
	useEffect(() => {
		const eventNames =
			typeof types === 'string' ? [ types ] : Array.isArray(types) ? types : [ 'touchstart', 'mousedown' ];

		const supportPassiveEvent = testPassiveEventSupport();
		const listenerOptions = supportPassiveEvent ? options : !!options.capture;
		if (supportPassiveEvent) {
			const passive = listenerOptions.passive;
			// passive option default to true
			listenerOptions.passive = passive === undefined ? true : passive;
		}

		const touchAction = (event) => {
			existTouchEventRef.current = true;
			action(event);
		};

		const mouseAction = (event) => {
			if (existTouchEventRef.current) {
				existTouchEventRef.current = false;
				return;
			}
			action(event);
		};

		const listeners = [];
		eventNames.forEach((eventName, index) => {
			listeners.push(
				eventName.includes('touch')
					? touchAction
					: (eventName.includes('mouse') || eventName === 'click') && mouseAction
			);
			target.addEventListener(eventName, listeners[index], listenerOptions);
		});

		return () => {
			eventNames.forEach((eventName, index) => {
				target.removeEventListener(eventName, listeners[index], listenerOptions);
			});
		};
	}, []);
	return children || null;
};

export default ClickOrTouch;
