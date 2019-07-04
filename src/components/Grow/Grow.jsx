import React, { useMemo } from 'react';
import $ from './_constants';
import { roundNumber, genTransitionProp, genDurationsEasings } from 'scripts';
import { CSSTransition, DivElement } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const Grow = ({
	in: inProp,
	children,
	style: propStyle = {},
	duration = $styles.duration,
	easing = $styles.easing,
	appear = true,
	onEnter,
	classNames: propClassNames,
	...props
}) => {
	const [ durations, easings ] = genDurationsEasings(duration, easing);

	const style = useMemo(() => {
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
			[ $styles.transitionTransform, roundNumber(durations.enter * $styles.scaleDurationRatio, 0), easings.enter ]
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
			...$styles.style,
			...propStyle
		};
	}, []);

	const classNames = useMemo(
		() => {
			return [ $names.ucGrow, ...(propClassNames || []) ];
		},
		[ propClassNames ]
	);

	return (
		<CSSTransition appear={appear} in={inProp} timeout={durations} {...props}>
			{(state, childProps) => {
				return (
					<DivElement {...childProps} style={style} classNames={classNames}>
						{children}
					</DivElement>
				);
			}}
		</CSSTransition>
	);

	// return (
	// 	<CSSTransition appear={appear} in={inProp} timeout={durations} {...props}>
	// 		{(state, childProps) => {
	// 			return (
	// 				<children.type
	// 					{...children.props}
	// 					{...childProps}
	// 					style={{ ...style, ...children.props.style }}
	// 					classNames={classNames}
	// 				/>
	// 			);
	// 		}}
	// 	</CSSTransition>
	// );
};

export default Grow;
