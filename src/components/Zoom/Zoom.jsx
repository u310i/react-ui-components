import React, { useMemo, useCallback, useRef } from 'react';
import $ from './_constants';
import { genTransitionProp, genDurationsEasings } from 'scripts';
import { CSSTransition } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const Zoom = ({
	in: inProp,
	children,
	style: propStyle = {},
	duration = $styles.duration,
	easing = $styles.easing,
	appear = true,
	classNames = [],
	...props
}) => {
	const [ durations, easings ] = genDurationsEasings(duration, easing);

	const style = useMemo(() => {
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
			...propStyle
		};
	}, []);

	useMemo(() => {
		classNames.push($names.ucGrow);
	}, []);

	return (
		<CSSTransition in={inProp} timeout={durations} appear={appear} {...props}>
			{(state, childProps) => {
				return (
					<children.type
						{...children.props}
						style={{ ...style, ...children.props.style }}
						classNames={classNames}
						{...childProps}
					/>
				);
			}}
		</CSSTransition>
	);
};

export default Zoom;
