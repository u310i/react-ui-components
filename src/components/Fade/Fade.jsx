import React, { useMemo } from 'react';
import $ from './_constants';
import { genTransitionProp, genDurations, genEasings } from 'scripts';
import { CSSTransition, DivElement } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const Fade = ({
	in: inProp,
	children,
	duration = $styles.duration,
	easing = $styles.easing,
	appear = true,
	...props
}) => {
	const durations = genDurations(duration);
	const easings = genEasings(easing);

	const _style_ = useMemo(
		() => {
			return {
				opacity: !appear && inProp ? $styles.enteredOpacity : $styles.exitedOpacity,
				[$selectors.enters]: {
					transition: genTransitionProp([ [ $styles.transitionProperty, durations.enter, easings.enter ] ]),
					opacity: $styles.exitedOpacity
				},
				[`${$selectors.enterings},${$selectors.entered}`]: {
					opacity: $styles.enteredOpacity
				},
				[$selectors.exit]: {
					transition: genTransitionProp([ [ $styles.transitionProperty, durations.exit, easings.exit ] ]),
					opacity: $styles.enteredOpacity
				},
				[`${$selectors.exiting},${$selectors.exited}`]: {
					opacity: $styles.exitedOpacity
				},
				[$selectors.exited]: {
					visibility: $styles.exitedVisibility
				}
			};
		},
		[ duration, easing ]
	);

	return (
		<CSSTransition appear={appear} in={inProp} timeout={durations} {...props}>
			{(state, childProps) => {
				return (
					<DivElement _style_={_style_} _className_={$names.ucFade} {...childProps}>
						{children}
					</DivElement>
				);
			}}
		</CSSTransition>
	);
};

export default Fade;
