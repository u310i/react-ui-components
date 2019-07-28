import * as React from 'react';
import { getNode, addEventListener, removeEventListener } from 'scripts';

const Click = ({ children, target = document, action, types = 'click', buttonNumber = 0, listenerOptions = {} }) => {
	const existTouchEventRef = React.useRef(null);
	const touchMoveDetectedRef = React.useRef(null);

	const resetTouchMoveDetect = React.useCallback(() => {
		if (touchMoveDetectedRef.current) {
			touchMoveDetectedRef.current = null;
		}
	}, []);

	const detectTouchMove = React.useCallback(() => {
		if (!touchMoveDetectedRef.current) {
			touchMoveDetectedRef.current = true;
		}
	}, []);

	const onTouch = React.useCallback(
		(event) => {
			existTouchEventRef.current = true;
			action(event, 'touch');
		},
		[ action ]
	);

	const onTouchEndForClick = React.useCallback((event) => {
		existTouchEventRef.current = true;
		if (touchMoveDetectedRef.current) {
			touchMoveDetectedRef.current = null;
			return;
		}
		action(event, 'touch');
	}, []);

	const onClick = React.useCallback(
		(event) => {
			if (existTouchEventRef.current) {
				existTouchEventRef.current = null;
				return;
			}
			action(event, 'mouse');
		},
		[ action ]
	);

	const onMouse = React.useCallback(
		(event) => {
			if (existTouchEventRef.current) {
				existTouchEventRef.current = null;
				return;
			}
			if (event.button === buttonNumber) action(event, 'mouse');
		},
		[ action, buttonNumber ]
	);

	React.useEffect(() => {
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
