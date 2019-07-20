import React  from 'react';
import { getNode, clickedScrollbar } from 'scripts';
import { EventListener } from '..';

const ClickOutside = ({ children, target, action, options, scope = document.body, includeScrollbar = false }) => {
	const listener = React.useCallback(
		(event) => {
			const node = getNode(target);
			if (node.contains(event.target)) return;
			if (!includeScrollbar && clickedScrollbar(event)) return;
			action(event);
		},
		[ action, includeScrollbar, target ]
	);

	return (
		<EventListener target={scope} type={'click'} listener={listener} options={options}>
			{children || null}
		</EventListener>
	);
};

export default ClickOutside;
