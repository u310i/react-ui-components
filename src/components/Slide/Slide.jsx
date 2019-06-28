import React, { useMemo, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import $ from './_constants';
import { genTransitionProp, genDurationsEasings, setTransition, setTransform, getElementRef } from 'scripts';
import { CSSTransition } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const GUTTER = 24;

const getExitedTranslateValue = (node, direction) => {
	const rect = node.getBoundingClientRect();

	const computedStyle = window.getComputedStyle(node);
	const transform =
		computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
	let offsetX = 0;
	let offsetY = 0;
	if (transform && transform !== 'none' && typeof transform === 'string') {
		const transformValues = transform.split('(')[1].split(')')[0].split(',');
		offsetX = parseInt(transformValues[4], 10);
		offsetY = parseInt(transformValues[5], 10);
	}

	switch (direction) {
		case 'left':
			return `translateX(${window.innerWidth}px) translateX(-${rect.left - offsetX}px)`;
		case 'right':
			return `translateX(-${rect.left + rect.width + GUTTER - offsetX}px)`;
		case 'up':
			return `translateY(${window.innerHeight}px) translateY(-${rect.top - offsetY}px)`;
		default:
			return `translateY(-${rect.top + rect.height + GUTTER - offsetY}px)`;
	}
};

const Slide = ({
	in: inProp,
	children,
	refer,
	style: propStyle = {},
	duration = $styles.duration,
	easing = $styles.easing,
	appear = true,
	direction = $styles.direction,
	onEnter,
	onEntering,
	onExiting,
	onExited,
	classNames = [],
	...props
}) => {
	const ref = useRef(null);

	const [ durations, easings ] = genDurationsEasings(duration, easing);

	const style = useMemo(() => {
		return {
			[$selectors.exited]: {
				visibility: $styles.exitedVisibility
			},
			...propStyle
		};
	}, []);

	useLayoutEffect(() => {
		const node = ref.current;
		if (appear || !inProp) {
			const translate = getExitedTranslateValue(node, direction);
			setTransform(node, translate);
		}
	}, []);

	const handleEnter = useCallback(
		(node, appearing) => {
			if (!appearing) {
				const translate = getExitedTranslateValue(node, direction);
				setTransform(node, translate);
			}
			if (onEnter) onEnter(node, appearing);
		},
		[ onEnter ]
	);

	const handleEntering = useCallback(
		(node, appearing) => {
			setTransition(node, genTransitionProp([ [ $styles.transitionProperty, durations.enter, easings.enter ] ]));
			setTransform(node, $styles.enteredTranslate);
			if (onEntering) onEntering(node, appearing);
		},
		[ onEntering ]
	);

	const handleExiting = useCallback(
		(node) => {
			setTransition(node, genTransitionProp([ [ $styles.transitionProperty, durations.exit, easings.exit ] ]));
			const translate = getExitedTranslateValue(node, direction);
			setTransform(node, translate);
			if (onExiting) onExiting(node);
		},
		[ onExiting ]
	);

	const handleExited = useCallback(
		(node) => {
			setTransition(node, null);
			if (onExited) onExited(node);
		},
		[ onExited ]
	);

	useMemo(() => {
		classNames.push($names.ucSlide);
	}, []);
	return (
		<CSSTransition
			appear={appear}
			in={inProp}
			timeout={durations}
			onEnter={handleEnter}
			onEntering={handleEntering}
			onExiting={handleExiting}
			onExited={handleExited}
			{...props}
		>
			{(state, childProps) => {
				return (
					<children.type
						{...children.props}
						style={{ ...style, ...children.props.style }}
						classNames={classNames}
						{...childProps}
						refer={(element) => {
							ref.current = element;
							getElementRef(refer, element);
						}}
					/>
				);
			}}
		</CSSTransition>
	);
};

export default Slide;
