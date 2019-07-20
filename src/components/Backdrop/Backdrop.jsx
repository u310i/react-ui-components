import React from 'react';
import $ from './_constants';
import {} from 'scripts';
import { Fade, DivElement } from '..';

const $styles = $.styles;

const Backdrop = ({
	children = null,
	open = true,
	disablePointerEvents = false,
	duration,
	invisible,
	TransitionComponent = Fade,
	transitionProps: propTransitionProps = {},
	...props
}) => {
	const _style_ = React.useMemo(
		() => {
			return {
				...$styles.style,
				...(invisible && $styles.invisible.style),
				...(disablePointerEvents && $styles.disablePointerEvents.style)
			};
		},
		[ invisible, disablePointerEvents ]
	);

	const transitionProps = {
		...propTransitionProps,
		...React.useMemo(
			() => {
				return {
					style: {
						...$styles.transition.style,
						...propTransitionProps.style
					},
					classNames: [ ...(propTransitionProps.classNames || []), $.names.ucBackdrop ]
				};
			},
			[ propTransitionProps.style, propTransitionProps.classNames ]
		)
	};

	return (
		<TransitionComponent in={open} duration={duration} aria-hidden={true} {...transitionProps}>
			<DivElement _style_={_style_} _className_={$.names.ucBackdropInner} {...props}>
				{children}
			</DivElement>
		</TransitionComponent>
	);
};

export default Backdrop;
