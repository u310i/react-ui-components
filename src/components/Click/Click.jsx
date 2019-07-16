import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { getNode, isArray, addEventListener, removeEventListener } from 'scripts';

const Click = ({ children, target = document, action, types = 'click', buttonNumber = 0, listenerOptions = {} }) => {
	const existTouchEventRef = useRef(null);
	const touchMoveDetectedRef = useRef(null);

	const resetTouchMoveDetect = useCallback(() => {
		if (touchMoveDetectedRef.current) {
			touchMoveDetectedRef.current = null;
		}
	}, []);

	const detectTouchMove = useCallback(() => {
		if (!touchMoveDetectedRef.current) {
			touchMoveDetectedRef.current = true;
		}
	}, []);

	const onTouch = useCallback(
		(event) => {
			existTouchEventRef.current = true;
			action(event, 'touch');
		},
		[ action ]
	);

	const onTouchEndForClick = useCallback((event) => {
		existTouchEventRef.current = true;
		if (touchMoveDetectedRef.current) {
			touchMoveDetectedRef.current = null;
			return;
		}
		action(event, 'touch');
	}, []);

	const onClick = useCallback(
		(event) => {
			if (existTouchEventRef.current) {
				existTouchEventRef.current = null;
				return;
			}
			action(event, 'mouse');
		},
		[ action ]
	);

	const onMouse = useCallback(
		(event) => {
			if (existTouchEventRef.current) {
				existTouchEventRef.current = null;
				return;
			}
			if (event.button === buttonNumber) action(event, 'mouse');
		},
		[ action, buttonNumber ]
	);

	useEffect(() => {
		const node = getNode(target);
		const names = typeof types === 'string' ? [ types ] : Array.isArray(types) ? types : 'click';

		const listenerMap = new Map();
		for (let name of names) {
			if (name === 'click') {
				listenerMap.set(name, onClick);
				addEventListener(node, 'touchstart', resetTouchMoveDetect, { passive: true });
				addEventListener(node, 'touchmove', detectTouchMove, { passive: true });
				addEventListener(node, 'touchend', onTouchEndForClick, listenerOptions);
				addEventListener(node, 'click', onClick, listenerOptions);
				continue;
			} else if (name.includes('touch')) {
				listenerMap.set(name, onTouch);
			} else if (name.includes('mouse')) {
				listenerMap.set(name, onMouse);
			} else continue;
			addEventListener(node, name, listenerMap.get(name), listenerOptions);
		}

		return () => {
			for (let [ name, listener ] of listenerMap) {
				if (name === 'click') {
					removeEventListener(node, 'touchstart', resetTouchMoveDetect);
					removeEventListener(node, 'touchmove', detectTouchMove);
					removeEventListener(node, 'touchend', onTouchEndForClick, listenerOptions);
					removeEventListener(node, 'click', onClick, listenerOptions);
					continue;
				}
				removeEventListener(node, name, listener, listenerOptions);
			}
		};
	}, []);
	return children || null;
};

export default Click;
