import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { getNode, testPassiveEventSupport, isArray, addEventListener, removeEventListener } from 'scripts';

const Click = ({ children, target = document, action, types = 'click', buttonNumber = 0, listenerOptions = {} }) => {
	const existTouchEventRef = useRef(false);

	const touchAction = useCallback(
		(event) => {
			existTouchEventRef.current = true;
			action(event);
		},
		[ action ]
	);

	const clickAction = useCallback(
		(event) => {
			if (existTouchEventRef.current) {
				existTouchEventRef.current = false;
				return;
			}
			action(event);
		},
		[ action ]
	);

	const mouseAction = useCallback(
		(event) => {
			if (existTouchEventRef.current) {
				existTouchEventRef.current = false;
				return;
			}
			if (event.button === buttonNumber) action(event);
		},
		[ action, buttonNumber ]
	);

	useEffect(() => {
		const node = getNode(target);
		const listenerTypes =
			typeof types === 'string' ? [ types ] : Array.isArray(types) ? types : [ 'touchstart', 'mousedown' ];

		const listeners = [];
		listenerTypes.forEach((listenerType, index) => {
			listeners.push(
				listenerType.includes('touch')
					? touchAction
					: listenerType.includes('mouse') ? mouseAction : listenerType === 'click' ? clickAction : () => {}
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

export default Click;
