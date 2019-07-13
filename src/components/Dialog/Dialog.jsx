import React, { useMemo, useCallback, useRef } from 'react';
import $ from './_constants';
import { getElementRef } from 'scripts';
import { Modal, Fade, Paper } from '..';

const $names = $.names;
const $styles = $.styles;
const $transitionStyle = $styles.transition;
const $innerStyle = $styles.inner;

const Dialog = ({
	children,
	open,
	onEscapeKeyDown,
	onOutsideClick,
	keepMounted = false,
	arias: propArias,
	enableScrollBody = false,
	fullScreen,
	modalProps: propModalProps = {},
	TransitionComponent = Fade,
	transitionProps: propTransitionProps = {},
	InnerComponent = Paper,
	innerProps: propInnerProps = {}
}) => {
	const innerRef = useRef(null);

	if (!propModalProps.rootProps) propModalProps.rootProps = {};
	if (!propModalProps.contentProps) propModalProps.contentProps = {};
	const modalProps = {
		onEscapeKeyDown,
		onOutsideClick,
		keepMounted,
		...propModalProps,
		...useMemo(
			() => {
				return {
					rootProps: {
						...propModalProps.rootProps,
						classNames: [ ...(propModalProps.rootProps.classNames || []), $names.ucDialog ]
					},
					contentProps: {
						...propModalProps.contentProps,
						classNames: [ ...(propModalProps.contentProps.classNames || []), $names.ucDialogContainer ],
						arias: {
							modal: true,
							...propArias,
							...propModalProps.contentProps.arias
						}
					}
				};
			},
			[ propModalProps.rootProps, propModalProps.contentProps ]
		)
	};

	const transitionProps = {
		...propTransitionProps,
		...useMemo(
			() => {
				return {
					style: {
						...$transitionStyle.style,
						...(enableScrollBody && $transitionStyle.scrollBody.style),
						...propTransitionProps.style
					},
					classNames: [ ...(propTransitionProps.classNames || []), $names.ucDialogTransition ]
				};
			},
			[ propTransitionProps.style, enableScrollBody, propTransitionProps.classNames ]
		)
	};

	const handleInnerRef = useCallback((element) => {
		innerRef.current = element;
		getElementRef(propInnerProps.refer, element);
	}, []);
	const innerProps = {
		...propInnerProps,
		...useMemo(
			() => {
				return {
					style: {
						...$innerStyle.style,
						...(enableScrollBody && $innerStyle.scrollBody.style),
						...(fullScreen && $innerStyle.fullScreen.style),
						...propInnerProps.style
					},
					classNames: [ ...(propInnerProps.classNames || []), $names.ucDialogInner ],
					refer: handleInnerRef
				};
			},
			[ propInnerProps.style, enableScrollBody, fullScreen, propInnerProps.classNames ]
		)
	};

	return (
		<Modal open={open} closeAfterTransition fallbackFocus={innerRef} {...modalProps}>
			<TransitionComponent in={open} {...transitionProps}>
				<InnerComponent
					elevation={$innerStyle.elevation}
					shape={fullScreen ? $innerStyle.fullScreen.shape : $innerStyle.shape}
					{...innerProps}
				>
					{children}
				</InnerComponent>
			</TransitionComponent>
		</Modal>
	);
};

export default Dialog;
