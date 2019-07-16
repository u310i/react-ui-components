import React, { useCallback } from 'react';
import { getNode, clickedScrollbar, addEventListener, removeEventListener } from 'scripts';
import { EventListener } from '..';

const ClickOutside = ({ children, target, action, option, scope, includeScrollbar = false }) => {
	const listener = useCallback(
		(event) => {
			const node = getNode(target);
			if (node.contains(event.target)) return;
			if (!includeScrollbar && clickedScrollbar(event)) return;
			action(event);
		},
		[ action, includeScrollbar, target ]
	);

	return (
		<EventListener target={scope} type={'click'} listener={listener} option={option}>
			{children || null}
		</EventListener>
	);
};

export default ClickOutside;
