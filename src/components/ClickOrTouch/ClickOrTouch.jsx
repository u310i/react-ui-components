import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { getNode, testPassiveEventSupport, isArray, addEventListener, removeEventListener } from 'scripts';

const ClickOrTouch = ({
	children,
	target = document,
	action,
	types = [ 'touchstart', 'mousedown' ],
	buttonNumber = 0,
	listenerOptions = {}
}) => {
	const existTouchEventRef = useRef(false);

	useEffect(() => {
		const node = getNode(target);
		const listenerTypes =
			typeof types === 'string' ? [ types ] : Array.isArray(types) ? types : [ 'touchstart', 'mousedown' ];

		const touchAction = (event) => {
			existTouchEventRef.current = true;
			action(event);
		};

		const clickAction = (event) => {
			if (existTouchEventRef.current) {
				existTouchEventRef.current = false;
				return;
			}
			action(event);
		};

		const mouseAction = (event) => {
			if (existTouchEventRef.current) {
				existTouchEventRef.current = false;
				return;
			}
			if (event.button === buttonNumber) action(event);
		};

		const listeners = [];
		listenerTypes.forEach((listenerType, index) => {
			listeners.push(
				listenerType.includes('touch')
					? touchAction
					: listenerType === 'click' ? clickAction : listenerType.includes('mouse') ? mouseAction : () => {}
			);
			addEventListener(node, listenerType, listeners[index], listenerOptions);
		});

		return () => {
			listenerTypes.forEach((listenerType, index) => {
				removeEventListener(node, listenerType, listeners[index], listenerOptions);
			});
		};
	}, []);
	return children || null;
};

export default ClickOrTouch;
