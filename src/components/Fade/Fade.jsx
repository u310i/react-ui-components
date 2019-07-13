import React, { useMemo, useLayoutEffect, useCallback, useRef } from 'react';
import $ from './_constants';
import { genTransitionProp, genDurations, genEasings, setTransition } from 'scripts';
import { CSSTransition, DivElement } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const setExitedOpacity = (node) => {
	node.style.opacity = 0;
};

const setEnteredOpacity = (node) => {
	node.style.opacity = 1;
};

const Fade = ({
	in: inProp,
	children,
	duration = $styles.duration,
	easing = $styles.easing,
	appear = true,
	onEnter,
	onEntering,
	onExiting,
	onExited,
	...props
}) => {
	const _ref_ = useRef(null);

	const durations = genDurations(duration);
	const easings = genEasings(easing);

	const _style_ = useMemo(() => {
		return {
			opacity: !appear && inProp ? $styles.enteredOpacity : $styles.exitedOpacity
		};
	}, []);

	useLayoutEffect(() => {
		const node = _ref_.current;
		if (appear || !inProp) {
			setExitedOpacity(node);
		}
	}, []);

	const handleEnter = useCallback(
		(node, appearing) => {
			if (!appearing) {
				setExitedOpacity(node);
			}
			node.style.visibility = null;
			if (onEnter) onEnter(node, appearing);
		},
		[ onEnter ]
	);

	const handleEntering = useCallback(
		(node, appearing) => {
			setTransition(node, genTransitionProp([ [ $styles.transitionProperty, durations.enter, easings.enter ] ]));
			setEnteredOpacity(node);
			if (onEntering) onEntering(node, appearing);
		},
		[ onEntering, duration, easing ]
	);

	const handleExiting = useCallback(
		(node) => {
			setTransition(node, genTransitionProp([ [ $styles.transitionProperty, durations.exit, easings.exit ] ]));
			setExitedOpacity(node);
			if (onExiting) onExiting(node);
		},
		[ onExiting, duration, easing ]
	);

	const handleExited = useCallback(
		(node) => {
			setTransition(node, null);
			node.style.visibility = 'hidden';
			if (onExited) onExited(node);
		},
		[ onExited ]
	);

	return (
		<CSSTransition
			appear={appear}
			in={inProp}
			timeout={durations}
			onEnter={handleEnter}
			onEntering={handleEntering}
			onExiting={handleExiting}
			onExited={handleExited}
			{...props}
		>
			{(state, childProps) => {
				return (
					<DivElement _style_={_style_} _className_={$names.ucFade} _refer_={_ref_} {...childProps}>
						{children}
					</DivElement>
				);
			}}
		</CSSTransition>
	);
};

export default Fade;
