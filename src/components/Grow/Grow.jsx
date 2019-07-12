import React, { useMemo } from 'react';
import $ from './_constants';
import { roundNumber, genTransitionProp, genDurations, genEasings } from 'scripts';
import { CSSTransition, DivElement } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const Grow = ({
	in: inProp,
	children,
	duration = $styles.duration,
	easing = $styles.easing,
	appear = true,
	onEnter,
	...props
}) => {
	const durations = genDurations(duration);
	const easings = genEasings(easing);

	const _style_ = useMemo(
		() => {
			const enteredStyle = {
				opacity: $styles.enteredOpacity,
				transform: $styles.enteredScale
			};
			const exitedStyle = {
				opacity: $styles.exitedOpacity,
				transform: `scale(${$styles.scaleXRatio}, ${$styles.scaleYRatio})`
			};

			const defaultTransitionalStyle = !appear && inProp ? enteredStyle : exitedStyle;

			const enterTransitionProp = genTransitionProp([
				[ $styles.transitionOpacity, durations.enter, easings.enter ],
				[
					$styles.transitionTransform,
					roundNumber(durations.enter * $styles.scaleDurationRatio, 0),
					easings.enter
				]
			]);
			const exitTransitionProp = genTransitionProp([
				[ $styles.transitionOpacity, durations.exit, easings.exit ],
				[
					$styles.transitionTransform,
					roundNumber(durations.exit * $styles.scaleDurationRatio, 0),
					easings.exit,
					roundNumber(durations.exit * $styles.outScalingDelayRatioFromDuration, 0)
				]
			]);

			return {
				...defaultTransitionalStyle,
				[$selectors.enters]: {
					transition: enterTransitionProp,
					...exitedStyle
				},
				[`${$selectors.enterings},${$selectors.entered}`]: enteredStyle,
				[$selectors.exit]: {
					transition: exitTransitionProp,
					...enteredStyle
				},
				[`${$selectors.exiting},${$selectors.exited}`]: exitedStyle,
				[$selectors.exited]: {
					visibility: $styles.exitedVisibility
				},
				...$styles.style
			};
		},
		[ duration, easing ]
	);

	return (
		<CSSTransition appear={appear} in={inProp} timeout={durations} {...props}>
			{(state, childProps) => {
				return (
					<DivElement _style_={_style_} _className_={$names.ucGrow} {...childProps}>
						{children}
					</DivElement>
				);
			}}
		</CSSTransition>
	);
};

export default Grow;
