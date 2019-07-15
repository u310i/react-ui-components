import React, { useState, useMemo, useCallback, useLayoutEffect, useRef } from 'react';
import $ from './_constants';
import { getElementRef } from 'scripts';
import { Modal, Slide, Paper } from '..';

const $names = $.names;
const $styles = $.styles;
const $modalContentStyle = $styles.modal.content;
const $transitionStyle = $styles.transition;
const $innerStyle = $styles.inner;

export const isHorizontal = (anchor) => {
	return [ 'left', 'right' ].indexOf(anchor) !== -1;
};

const slideDirections = {
	left: 'right',
	right: 'left',
	top: 'down',
	bottom: 'up'
};

export const getSlideDirections = (anchor) => {
	return slideDirections[anchor];
};

const Drawer = ({
	children,
	refer,
	open,
	onEscapeKeyDown,
	onOutsideClick,
	keepMount = true,
	anchor = 'left',
	arias: propArias,
	modalProps: propModalProps = {},
	TransitionComponent = Slide,
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
		keepMount,
		...propModalProps,
		...useMemo(
			() => {
				return {
					rootProps: {
						...propModalProps.rootProps,
						classNames: [ ...(propModalProps.rootProps.classNames || []), $names.ucDrawer ]
					},
					contentProps: {
						...propModalProps.contentProps,
						style: {
							...$modalContentStyle.style,
							...$modalContentStyle[anchor].style,
							...propModalProps.contentProps.style
						},
						classNames: [ ...(propModalProps.contentProps.classNames || []), $names.ucDrawerContainer ],
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
						...propTransitionProps.style
					},
					classNames: [ ...(propTransitionProps.classNames || []), $names.ucDrawerTransition ]
				};
			},
			[ propTransitionProps.style, propTransitionProps.classNames ]
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
						...(isHorizontal(anchor) ? $innerStyle.horizontal.style : $innerStyle.vertical.style),
						...propInnerProps.style
					},
					classNames: [ ...(propInnerProps.classNames || []), $names.ucDrawerInner ],
					refer: handleInnerRef
				};
			},
			[ propInnerProps.style, propInnerProps.classNames ]
		)
	};

	return (
		<Modal open={open} closeAfterTransition fallbackFocus={innerRef} {...modalProps}>
			<TransitionComponent in={open} appear={false} direction={getSlideDirections(anchor)} {...transitionProps}>
				<InnerComponent refer={innerRef} elevation={$styles.inner.elevation} shape="corner" {...innerProps}>
					{children}
				</InnerComponent>
			</TransitionComponent>
		</Modal>
	);
};

export default Drawer;
