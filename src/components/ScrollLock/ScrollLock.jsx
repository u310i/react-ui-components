import React  from 'react';
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

const ScrollLock = ({ children, target, active = true, fillGap = true }) => {
	const prevActiveRef = React.useRef(null);

	React.useEffect(
		() => {
			const targetElement = getNode(target);
			if (active && !prevActiveRef.current) {
				scrollLock.lock(targetElement, { reserveScrollBarGap: fillGap });
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
