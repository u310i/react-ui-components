import React, { useMemo, useLayoutEffect, React.useCallback, useRef } from 'react';
import $ from './_constants';
import { genTransitionProp, genDurations, genEasings, setTransition } from 'scripts';
import { CSSTransition, DivElement } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const setExitedOpacity = (node) => {
	node.style.opacity = $styles.exitedOpacity;
};

const setEnteredOpacity = (node) => {
	node.style.opacity = $styles.enteredOpacity;
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
	disableHideVisibility,
	...props
}) => {
	const _ref_ = useRef(null);

	const [ durations, easings ] = useMemo(
		() => {
			return [ genDurations(duration), genEasings(easing) ];
		},
		[ duration, easing ]
	);

	useLayoutEffect(() => {
		const node = _ref_.current;
		if (!appear && inProp) {
			setEnteredOpacity(node);
		} else {
			setExitedOpacity(node);
			if (!disableHideVisibility) node.style.visibility = 'hidden';
		}
	}, []);

	const handleEntering = React.useCallback(
		(node, appearing) => {
			setTransition(node, genTransitionProp([ [ 'opacity', durations.enter, easings.enter ] ]));
			setEnteredOpacity(node);
			if (!disableHideVisibility) node.style.visibility = null;
			if (onEntering) onEntering(node, appearing);
		},
		[ onEntering, durations, easings ]
	);

	const handleExiting = React.useCallback(
		(node) => {
			setTransition(node, genTransitionProp([ [ 'opacity', durations.exit, easings.exit ] ]));
			setExitedOpacity(node);
			if (onExiting) onExiting(node);
		},
		[ onExiting, durations, easings ]
	);

	const handleExited = React.useCallback(
		(node) => {
			setTransition(node, null);
			if (!disableHideVisibility) node.style.visibility = 'hidden';
			if (onExited) onExited(node);
		},
		[ onExited ]
	);

	return (
		<CSSTransition
			disableClassing={true}
			appear={appear}
			in={inProp}
			timeout={durations}
			onEntering={handleEntering}
			onExiting={handleExiting}
			onExited={handleExited}
			{...props}
		>
			{(state, childProps) => {
				return (
					<DivElement _style_={$styles.style} _className_={$names.ucFade} _refer_={_ref_} {...childProps}>
						{children}
					</DivElement>
				);
			}}
		</CSSTransition>
	);
};

export default Fade;
