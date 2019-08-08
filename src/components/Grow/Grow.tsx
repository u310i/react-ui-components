import React from 'react';
import $ from './_constants';
import { roundNumber, genTransitionProperty, genDurations, genEasings, setTransition, setTransform } from 'scripts';
import { CSSTransition, BaseElement } from '..';

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
	const _ref_ = React.useRef(null);

	const [ durations, easings ] = React.useMemo(
		() => {
			return [ genDurations(duration), genEasings(easing) ];
		},
		[ duration, easing ]
	);

	const [ enteredTransitionProp, exitedTransitionProp ] = React.useMemo(
		() => {
			const entered = genTransitionProperty([
				[ 'opacity', durations.enter, easings.enter ],
				[ 'transform', roundNumber(durations.enter * $styles.scaleDurationRatio, 0), easings.enter ]
			]);
			const exited = genTransitionProperty([
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

	React.useLayoutEffect(() => {
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
					<BaseElement
						elementName="div"
						_style_={$styles.style}
						_className_={$names.ucGrow}
						_refer_={_ref_}
						{...childProps}
					>
						{children}
					</BaseElement>
				);
			}}
		</CSSTransition>
	);
};

export default Grow;
