import React, { useMemo, useRef, React.useCallback, useLayoutEffect } from 'react';
import $ from './_constants';
import { roundNumber, genTransitionProp, genDurations, genEasings, setTransition, setTransform } from 'scripts';
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

const Grow = ({
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

	const [ enteredTransitionProp, exitedTransitionProp ] = useMemo(
		() => {
			const entered = genTransitionProp([
				[ 'opacity', durations.enter, easings.enter ],
				[ 'transform', roundNumber(durations.enter * $styles.scaleDurationRatio, 0), easings.enter ]
			]);
			const exited = genTransitionProp([
				[ 'opacity', durations.exit, easings.exit ],
				[
					'transform',
					roundNumber(durations.exit * $styles.scaleDurationRatio, 0),
					easings.exit,
					roundNumber(durations.exit * $styles.outScalingDelayRatioFromDuration, 0)
				]
			]);
			return [ entered, exited ];
		},
		[ durations, easings ]
	);

	const enteredScale = $styles.enteredScale;
	const exitedScale = `scale(${$styles.scaleXRatio}, ${$styles.scaleYRatio})`;

	useLayoutEffect(() => {
		const node = _ref_.current;
		if (!appear && inProp) {
			setTransform(node, enteredScale);
			setEnteredOpacity(node);
		} else {
			setTransform(node, exitedScale);
			setExitedOpacity(node);
			if (!disableHideVisibility) node.style.visibility = 'hidden';
		}
	}, []);

	const handleEntering = React.useCallback(
		(node, appearing) => {
			setTransition(node, enteredTransitionProp);
			setTransform(node, enteredScale);
			setEnteredOpacity(node);
			if (!disableHideVisibility) node.style.visibility = null;
			if (onEntering) onEntering(node, appearing);
		},
		[ onEntering, durations, easings ]
	);

	const handleExiting = React.useCallback(
		(node) => {
			setTransition(node, exitedTransitionProp);
			setTransform(node, exitedScale);
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
			onEntering={handleEntering}
			onExiting={handleExiting}
			onExited={handleExited}
			in={inProp}
			timeout={durations}
			{...props}
		>
			{(state, childProps) => {
				return (
					<DivElement _style_={$styles.style} _className_={$names.ucGrow} _refer_={_ref_} {...childProps}>
						{children}
					</DivElement>
				);
			}}
		</CSSTransition>
	);
};

export default Grow;
