import React, { useMemo, useCallback, useRef } from 'react';
import $ from './_constants';
import { reflow, genTransitionProp, genDurations, genEasings } from 'scripts';
import { CSSTransition, DivElement } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const Collapse = ({
	in: inProp,
	children,
	duration = $styles.duration,
	easing = $styles.easing,
	collapsedHeight = $styles.collapsedHeight,
	appear = true,
	onEnter,
	onEntering,
	onEntered,
	onExit,
	onExiting,
	innerProps,
	outerProps,
	...props
}) => {
	const _ref_ = useRef(null);

	const durations = genDurations(duration);
	const easings = genEasings(easing);

	const _style_ = useMemo(
		() => {
			return {
				outer: {
					height: !appear && inProp ? $styles.height : collapsedHeight,
					overflow: $styles.overflow,
					[$selectors.enters]: {
						transition: genTransitionProp([
							[ $styles.transitionProperty, durations.enter, easings.enter ]
						])
					},
					[$selectors.exit]: {
						transition: genTransitionProp([ [ $styles.transitionProperty, durations.exit, easings.exit ] ])
					}
				},
				inner: $styles.inner
			};
		},
		[ duration, easing ]
	);

	const handleEntering = useCallback(
		(node, appearing) => {
			reflow(node);
			node.style.height = `${ref.current.clientHeight}px`;
			if (onEntering) onEntering(node, appearing);
		},
		[ onEntering ]
	);

	const handleEntered = useCallback(
		(node, appearing) => {
			node.style.height = $styles.height;
			if (onEntered) onEntered(node, appearing);
		},
		[ onEntered ]
	);

	const handleExit = useCallback(
		(node) => {
			node.style.height = `${ref.current.clientHeight}px`;
			reflow(node);
			if (onExit) onExit(node);
		},
		[ onExit, ref.current ]
	);

	const handleExiting = useCallback(
		(node) => {
			node.style.height = collapsedHeight;
			if (onExiting) onExiting(node);
		},
		[ onExiting ]
	);

	return (
		<CSSTransition
			in={inProp}
			timeout={durations}
			onEntering={handleEntering}
			onEntered={handleEntered}
			onExit={handleExit}
			onExiting={handleExiting}
			appear={appear}
			{...props}
		>
			{(state, childProps) => {
				return (
					<DivElement _style_={_style_.outer} _className_={$names.ucCollapse} {...outerProps} {...childProps}>
						<DivElement
							_refer_={_ref_}
							_style_={_style_.inner}
							_className_={$names.ucCollapseInner}
							{...innerProps}
						>
							{children}
						</DivElement>
					</DivElement>
				);
			}}
		</CSSTransition>
	);
};

export default Collapse;
