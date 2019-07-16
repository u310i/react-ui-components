import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { getNode, clickedScrollbar } from 'scripts';
import { Click } from '..';

const ClickOutside = ({ children, refer, target, action, includeScrollbar = false, ...props }) => {
	const listener = useCallback((event) => {
		const node = getNode(target);
		if (node.contains(event.target)) return;
		if (!includeScrollbar && clickedScrollbar(event)) return;
		action(event);
	}, []);

	return (
		<Click action={listener} {...props}>
			{children || null}
		</Click>
	);
};

export default ClickOutside;
