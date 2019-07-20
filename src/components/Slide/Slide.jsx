import React  from 'react';
import $ from './_constants';
import { genTransitionProp, genDurations, genEasings, setTransition, setTransform, getElementRef } from 'scripts';
import { CSSTransition, DivElement } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const getExitedTranslateValue = (node, direction, gutter) => {
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
			return `translateX(${window.innerWidth + gutter}px) translateX(-${rect.left - offsetX}px)`;
		case 'right':
			return `translateX(-${rect.left + rect.width + gutter - offsetX}px)`;
		case 'up':
			return `translateY(${window.innerHeight + gutter}px) translateY(-${rect.top - offsetY}px)`;
		default:
			return `translateY(-${rect.top + rect.height + gutter - offsetY}px)`;
	}
};

const Slide = ({
	in: inProp,
	children,
	duration = $styles.duration,
	easing = $styles.easing,
	appear = true,
	direction = $styles.direction,
	gutter = $styles.gutter,
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

	React.useLayoutEffect(() => {
		const node = _ref_.current;
		if (!appear && inProp) {
			setTransform(node, $styles.enteredTranslate);
		} else {
			const translate = getExitedTranslateValue(node, direction, gutter);
			setTransform(node, translate);
			if (!disableHideVisibility) node.style.visibility = 'hidden';
		}
	}, []);

	const handleEntering = React.useCallback(
		(node, appearing) => {
			setTransition(node, genTransitionProp([ [ 'transform', durations.enter, easings.enter ] ]));
			setTransform(node, $styles.enteredTranslate);
			if (!disableHideVisibility) node.style.visibility = null;
			if (onEntering) onEntering(node, appearing);
		},
		[ onEntering, durations, easings ]
	);

	const handleExiting = React.useCallback(
		(node) => {
			setTransition(node, genTransitionProp([ [ 'transform', durations.exit, easings.exit ] ]));
			const translate = getExitedTranslateValue(node, direction, gutter);
			setTransform(node, translate);
			if (onExiting) onExiting(node);
		},
		[ onExiting, durations, easings, gutter ]
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
					<DivElement
						_refer_={_ref_}
						_style_={$styles.style}
						_className_={$names.ucSlide}
						{...childProps}
						identifier={'slide'}
					>
						{children}
					</DivElement>
				);
			}}
		</CSSTransition>
	);
};

export default Slide;
