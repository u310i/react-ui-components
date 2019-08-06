import React from 'react';
import $ from './_constants';
import { genTransitionProperty, genDurations, genEasings, setTransition, setTransform } from 'scripts';
import { CSSTransition, BaseElement } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const Zoom = ({
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

	React.useLayoutEffect(() => {
		const node = _ref_.current;
		if (!appear && inProp) {
			setTransform(node, $styles.enteredScale);
		} else {
			setTransform(node, $styles.exitedScale);
			if (!disableHideVisibility) node.style.visibility = 'hidden';
		}
	}, []);

	const handleEntering = React.useCallback(
		(node, appearing) => {
			setTransition(node, genTransitionProperty([ [ 'transform', durations.enter, easings.enter ] ]));
			setTransform(node, $styles.enteredScale);
			if (!disableHideVisibility) node.style.visibility = null;
			if (onEntering) onEntering(node, appearing);
		},
		[ onEntering, durations, easings ]
	);

	const handleExiting = React.useCallback(
		(node) => {
			setTransition(node, genTransitionProperty([ [ 'transform', durations.exit, easings.exit ] ]));
			setTransform(node, $styles.exitedScale);
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
			in={inProp}
			timeout={durations}
			appear={appear}
			onEntering={handleEntering}
			onExiting={handleExiting}
			onExited={handleExited}
			{...props}
		>
			{(state, childProps) => {
				return (
					<BaseElement
						tagName="div"
						_style_={$styles.style}
						_className_={$names.ucZoom}
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

export default Zoom;
