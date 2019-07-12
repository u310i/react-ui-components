import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { getNode, clickedScrollbar } from 'scripts';
import { ClickOrTouch } from '..';

const ClickOrTouchOnOutside = ({ children, refer, target, action, includeScrollbar = false, ...props }) => {
	const listener = useCallback((event) => {
		const node = getNode(target);
		if (node.contains(event.target)) return;
		if (!includeScrollbar && clickedScrollbar(event)) return;
		action(event);
	}, []);

	return (
		<ClickOrTouch action={listener} {...props}>
			{children || null}
		</ClickOrTouch>
	);
};

export default ClickOrTouchOnOutside;
