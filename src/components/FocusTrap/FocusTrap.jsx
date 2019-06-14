import React, { useRef, useEffect } from 'react';
import { DivElement } from '..';
import CreateFocusTrap from 'focus-trap';

// https://github.com/davidtheclark/focus-trap-react

// We need to hijack the returnFocusOnDeactivate option,
// because React can move focus into the element before we arrived at
// this lifecycle hook (e.g. with autoFocus inputs). So the component
// captures the previouslyFocusedElement in componentWillMount,
// then (optionally) returns focus to it in componentWillUnmount.

const FocusTrap = ({
	children,
	style: propStyle = {},
	options = {},
	active = true,
	paused = false,
	refer,
	...props
}) => {
	const ref = useRef(null);
	const { returnFocusOnDeactivate, ...tailoredOptions } = options;
	tailoredOptions.returnFocusOnDeactivate = false;

	const focusTrapRef = useRef(null);
	const previouslyFocusedElementRef = useRef(document.activeElement);
	const prevActiveRef = useRef(null);
	const prevPausedRef = useRef(null);

	useEffect(
		() => {
			if (focusTrapRef.current === null) {
				focusTrapRef.current = CreateFocusTrap(ref.current, tailoredOptions);
			}
			const focusTrap = focusTrapRef.current;

			if (prevActiveRef.current === null) {
				if (active) focusTrap.activate();
				if (paused) focusTrap.paused();
			} else {
				if (prevActiveRef.current && !active) {
					const returnFocus = options.returnFocusOnDeactivate || false;
					focusTrap.deactivate({ returnFocus });
				} else if (!prevActiveRef.current && active) {
					focusTrap.activate();
				}

				if (prevPausedRef.current && !paused) {
					focusTrap.unpause();
				} else if (!prevPausedRef.current && paused) {
					focusTrap.paused();
				}
			}

			prevActiveRef.current = active;
			prevPausedRef.current = paused;

			return () => {
				focusTrap.deactivate();
				if (
					options.returnFocusOnDeactivate !== false &&
					previouslyFocusedElementRef.current &&
					previouslyFocusedElementRef.current.focus
				) {
					previouslyFocusedElementRef.current.focus();
				}
			};
		},
		[ active, paused ]
	);

	refer.current = ref.current;

	return (
		<DivElement style={propStyle} className="uc-focusTrap" refer={ref} {...props}>
			{children}
		</DivElement>
	);
};

export default FocusTrap;
