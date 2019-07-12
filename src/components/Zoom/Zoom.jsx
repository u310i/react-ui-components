import React, { useMemo, useCallback, useRef } from 'react';
import $ from './_constants';
import { genTransitionProp, genDurations, genEasings } from 'scripts';
import { CSSTransition, DivElement } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const Zoom = ({
	in: inProp,
	children,
	duration = $styles.duration,
	easing = $styles.easing,
	appear = true,
	...props
}) => {
	const durations = genDurations(duration);
	const easings = genEasings(easing);

	const style = useMemo(
		() => {
			return {
				transform: !appear && inProp ? $styles.enteredScale : $styles.exitedScale,
				[$selectors.enters]: {
					transition: genTransitionProp([ [ $styles.transitionProperty, durations.enter, easings.enter ] ]),
					transform: $styles.exitedScale
				},
				[`${$selectors.enterings},${$selectors.entered}`]: {
					transform: $styles.enteredScale
				},
				[$selectors.exit]: {
					transition: genTransitionProp([ [ $styles.transitionProperty, durations.exit, easings.exit ] ]),
					transform: $styles.enteredScale
				},
				[`${$selectors.exiting},${$selectors.exited}`]: {
					transform: $styles.exitedScale
				},
				[$selectors.exited]: {
					visibility: $styles.exitedVisibility
				},
				...$styles.style
			};
		},
		[ duration, easing ]
	);

	return (
		<CSSTransition in={inProp} timeout={durations} appear={appear} {...props}>
			{(state, childProps) => {
				return (
					<DivElement _className_={$names.ucZoom} _style_={_style_} {...childProps}>
						{children}
					</DivElement>
				);
			}}
		</CSSTransition>
	);
};

export default Zoom;
