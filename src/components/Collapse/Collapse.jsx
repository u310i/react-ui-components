import React, { useMemo, useCallback, useRef, useLayoutEffect } from 'react';
import $ from './_constants';
import { reflow, genTransitionProp, genDurations, genEasings, setTransition } from 'scripts';
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
	onEntering,
	onEntered,
	onExit,
	onExiting,
	onExited,
	innerProps,
	disableHideVisibility,
	...props
}) => {
	const _outerRef_ = useRef(null);
	const _innerRef_ = useRef(null);

	const [ durations, easings ] = useMemo(
		() => {
			return [ genDurations(duration), genEasings(easing) ];
		},
		[ duration, easing ]
	);

	useLayoutEffect(() => {
		const node = _outerRef_.current;
		if (!appear && inProp) {
			node.style.height = $styles.enteredHeight;
			node.style.overflow = 'visible';
		} else {
			node.style.height = collapsedHeight;
			node.style.overflow = 'hidden';
			if (!disableHideVisibility) node.style.visibility = 'hidden';
		}
	}, []);

	const handleEntering = useCallback(
		(node) => {
			setTransition(node, genTransitionProp([ [ 'height', durations.enter, easings.enter ] ]));
			node.style.height = `${_innerRef_.current.clientHeight}px`;
			node.style.overflow = 'hidden';
			if (!disableHideVisibility) node.style.visibility = null;
			if (onEntering) onEntering(node, appearing);
		},
		[ onEntering ]
	);

	const handleEntered = useCallback(
		(node) => {
			node.style.overflow = 'visible';
			node.style.height = $styles.enteredHeight;
			if (onEntered) onEntered(node, appearing);
		},
		[ onEntered ]
	);

	const handleExit = useCallback(
		(node) => {
			setTransition(node, genTransitionProp([ [ 'height', durations.exit, easings.exit ] ]));
			node.style.height = `${_outerRef_.current.clientHeight}px`;
			node.style.overflow = 'hidden';
			if (onExit) onExit(node);
		},
		[ onExit ]
	);

	const handleExiting = useCallback(
		(node) => {
			node.style.height = collapsedHeight;
			if (onExiting) onExiting(node);
		},
		[ onExiting ]
	);

	const handleExited = useCallback(
		(node) => {
			if (!disableHideVisibility) node.style.visibility = 'hidden';
			if (onExited) onExited(node);
		},
		[ onExited ]
	);

	return (
		<CSSTransition
			disableClassing={true}
			lazyAppear={true}
			appear={appear}
			in={inProp}
			timeout={durations}
			onEntering={handleEntering}
			onEntered={handleEntered}
			onExit={handleExit}
			onExiting={handleExiting}
			onExited={handleExited}
			{...props}
		>
			{(state, childProps) => {
				return (
					<DivElement
						_style_={$styles.outer.style}
						_className_={$names.ucCollapse}
						_refer_={_outerRef_}
						{...childProps}
					>
						<DivElement
							_style_={$styles.inner.style}
							_className_={$names.ucCollapseInner}
							_refer_={_innerRef_}
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
