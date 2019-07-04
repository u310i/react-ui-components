import React, { useMemo, useRef } from 'react';
import $ from './_constants';
import { Modal, Fade, Paper, DivElement } from '..';

const $names = $.names;
const $selectors = $.selectors;
const $styles = $.styles;

const Dialog = ({
	children,
	refer,
	open,
	aria: propAria = {},
	enableScrollBody = false,
	fullScreen,
	modalProps = {},
	TransitionComponent = Fade,
	TransitionComponentProps = {},
	InnerComponent = Paper,
	innerComponentProps = {},
	...props
}) => {
	const innerRef = useRef(null);

	modalProps.classNames = useMemo(
		() => {
			return [ $names.ucDialog, ...(modalProps.classNames || []) ];
		},
		[ modalProps.classNames ]
	);

	modalProps.contentComponentProps = useMemo(
		() => {
			return {
				role: 'dialog',
				aria: {
					modal: true,
					...propAria
				},
				...modalProps.contentComponentProps
			};
		},
		[ modalProps.contentComponentProps, propAria ]
	);

	modalProps.contentComponentProps.style = useMemo(
		() => {
			return {
				...modalProps.contentComponentProps.style
			};
		},
		[ modalProps.contentComponentProps.style ]
	);

	modalProps.contentComponentProps.classNames = useMemo(
		() => {
			return [ $names.ucDialogContainer, ...(modalProps.contentComponentProps.classNames || []) ];
		},
		[ modalProps.contentComponentProps.classNames ]
	);

	TransitionComponentProps.style = useMemo(
		() => {
			return {
				...$styles.transition.style,
				...(enableScrollBody && $styles.transition.scrollBody),
				...TransitionComponentProps.style
			};
		},
		[ TransitionComponentProps.style, enableScrollBody ]
	);

	TransitionComponentProps.classNames = useMemo(
		() => {
			return [ $names.ucDialogTransition, ...(TransitionComponentProps.classNames || []) ];
		},
		[ TransitionComponentProps.classNames ]
	);

	innerComponentProps.style = useMemo(
		() => {
			return {
				...$styles.inner.style,
				...(enableScrollBody && $styles.inner.scrollBody),
				...(fullScreen && $styles.inner.fullScreen),
				...innerComponentProps.style
			};
		},
		[ innerComponentProps.style, enableScrollBody ]
	);

	innerComponentProps.classNames = useMemo(
		() => {
			return [ $names.ucDialogInner, ...(innerComponentProps.classNames || []) ];
		},
		[ innerComponentProps.classNames ]
	);

	return (
		<Modal open={open} closeAfterTransition fallbackFocus={innerRef} {...modalProps} {...props}>
			<TransitionComponent in={open} {...TransitionComponentProps}>
				<InnerComponent
					refer={innerRef}
					elevation={fullScreen ? 0 : $styles.inner.elevation}
					shape={fullScreen ? 'corner' : 'default'}
					{...innerComponentProps}
				>
					{children}
				</InnerComponent>
			</TransitionComponent>
		</Modal>
	);
};

export default Dialog;
