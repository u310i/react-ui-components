import React, { useState, useMemo, useCallback, useEffect, useRef, useReducer } from 'react';
import {
	isNumber,
	getTransitionEndName,
	addEventListener,
	removeEventListener,
	getElementRef,
	getNode,
	scrollLock
} from 'scripts';
import { DivElement } from '..';

// https://github.com/willmcpo/body-scroll-lock

const ScrollLock = ({ children, target, active = true }) => {
	const prevActiveRef = useRef(null);

	useEffect(
		() => {
			const targetElement = getNode(target);
			if (active && !prevActiveRef.current) {
				scrollLock.lock(targetElement);
			}
			if (!active && prevActiveRef.current) {
				scrollLock.restore(targetElement);
			}
			prevActiveRef.current = active;

			return () => {
				scrollLock.restore(targetElement);
			};
		},
		[ active ]
	);
	return children || null;
};

export default ScrollLock;
