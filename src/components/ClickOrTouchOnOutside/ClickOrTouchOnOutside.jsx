import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import $ from './_constants';
import { clickedScrollbar } from 'scripts';
import { DivElement, ClickOrTouch } from '..';

const $names = $.names;

const ClickOrTouchOnOutside = ({
	children,
	refer,
	target,
	action,
	includeScrollbar = false,
	propsOfClickOrTouch = {},
	...props
}) => {
	const listener = useCallback((event) => {
		const targetElement = target.current || target;
		if (targetElement.contains(event.target)) return;
		if (!includeScrollbar && clickedScrollbar(event)) return;
		action(event);
	}, []);

	return (
		<ClickOrTouch action={listener} {...propsOfClickOrTouch}>
			{children || null}
		</ClickOrTouch>
	);
};

export default ClickOrTouchOnOutside;
