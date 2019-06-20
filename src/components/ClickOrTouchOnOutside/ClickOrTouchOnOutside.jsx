import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import $ from './_constants';
import { clickedScrollbar } from 'scripts';
import { DivElement, ClickOrTouch } from '..';

const $names = $.names;

const ClickOrTouchOnOutside = ({
	children,
	refer,
	targetRef,
	action,
	includeScrollbar = false,
	propsOfClickOrTouch = {},
	...props
}) => {
	const ref = useRef(null);
	// const targetRef = useRef(null);

	// useEffect

	// const targetElement = target.current || target;
	// const innerElement = ref.current;

	// targetRef.current = targetElement || innerElement;
	const listener = useCallback((event) => {
		if (target.current.contains(event.target)) return;
		if (!includeScrollbar && clickedScrollbar(event)) return;
		action(event);
	}, []);

	return (
		<ClickOrTouch action={listener} {...propsOfClickOrTouch}>
			{/* {!targetElement ? (
				<DivElement
					refer={(element) => {
						ref.current = element;
						if (refer) refer.current = element;
					}}
					className="uc-clickOrTouchOnOutside"
					{...props}
				>
					{children}
				</DivElement>
			) : (
				children || null
			)} */}
			{children || null}
		</ClickOrTouch>
	);
};

export default ClickOrTouchOnOutside;
