import React, { useState, useMemo, useCallback, useEffect, useRef, useReducer } from 'react';
import $ from './_constants';
import { isNumber, getTransitionEndName, addEventListener, removeEventListener, getElementRef } from 'scripts';
import {
	DivElement,
	EventListener,
	Portal,
	HideOtherAria,
	Backdrop,
	Paper,
	FocusTrap,
	HotKeys,
	ClickOrTouchOnOutside,
	ScrollLock
} from '..';

const $names = $.names;
const $styles = $.styles;

const getHasTransition = (children) => {
	return children ? children.props.hasOwnProperty('in') : false;
};

const modalQueue = [];
let zIndexCounter = 0;

const Modal = ({
	id,
	children,
	refer,
	style: propStyle = {},
	classNames: propClassNames = [],
	container,
	open,
	onMountedChild,
	onClose,
	onEscapeKeyDown,
	onOutsideClick,
	closeAfterTransition = false,
	disableEscapeKeyDown = false,
	disableOutsideClick = false,
	disableHideOtherAria = false,
	disableEnforceFocus = false,
	disableRestoreFocus = false,
	disableFallbackFocus = false,
	disableBackdrop = false,
	disableScrollLock = false,
	scrollTarget,
	clickOrTouchOnOutsideProps = {},
	backdropProps = {},
	focustrapProps = {},
	...props
}) => {
	const containerRef = useRef(null);
	const childRef = useRef(null);
	// Becomes true if 'open' is true,
	//  It will be false when the end transition is exited.
	const shouldMountRef = useRef(null);
	const closingReasonRef = useRef(null);
	// It is true until 'open' changes to false and is unmounted.
	const isClosedRef = useRef(null);
	const prevOpenRef = useRef(null);
	// Synchronize with 'open'.
	const isOpenRef = useRef(null);

	const [ , forceUpdate ] = useReducer((x) => x + 1, 0);

	// A session to manage multiple modes.
	const modalManagerRef = useRef({ isActive: null, update: forceUpdate });

	if (open && !isOpenRef.current) {
		isOpenRef.current = true;
		modalManagerRef.current.isActive = true;
		if (modalQueue.length > 0) {
			const currentModalRef = modalQueue[modalQueue.length - 1];
			if (modalManagerRef !== currentModalRef) {
				if (currentModalRef.current.isActive) {
					currentModalRef.current.isActive = null;
					currentModalRef.current.update();
				}
			}

			const index = modalQueue.indexOf(modalManagerRef);
			if (index === -1) {
				modalQueue.push(modalManagerRef);
			} else {
				modalQueue.splice(index, 1);
				modalQueue.push(modalManagerRef);
			}
		} else {
			modalQueue.push(modalManagerRef);
		}
	}

	if (!open && isOpenRef.current) {
		isOpenRef.current = null;
		modalManagerRef.current.isActive = null;
		const index = modalQueue.indexOf(modalManagerRef);
		if (index !== -1) {
			modalQueue.splice(index, 1);
		}

		if (modalQueue.length > 0) {
			const lastModalRef = modalQueue[modalQueue.length - 1];
			if (!lastModalRef.current.isActive) {
				lastModalRef.current.isActive = true;
				lastModalRef.current.update();
			}
		} else {
			zIndexCounter = 0;
		}
	}

	// 'ZIndex' is counted up when newly opened
	// The reason for not using "handleMountedChild" is
	//  that if 'open' is changed to 'true' before the modal child is unmounted,
	//  it will not be mounted and will not count up.
	useEffect(
		() => {
			if (open && !prevOpenRef.current) {
				containerRef.current.style.zIndex = zIndexCounter;
				zIndexCounter += 1;
			}
			prevOpenRef.current = open;
		},
		[ open ]
	);

	// If you want to unmount after waiting for the transition,
	//  use 'forceUpdate' to unmount after the transition.
	const handleExited = useCallback(
		(node) => {
			const childrenOnExited = children && children.props && children.props.onExited;
			childrenOnExited && childrenOnExited(node);
			shouldMountRef.current = null;
			forceUpdate();
		},
		[ children.props.onExited ]
	);

	const handleMountedChild = useCallback(() => {
		onMountedChild && onMountedChild(childRef.current);
	}, []);

	const handleUnmountChild = useCallback(() => {
		isClosedRef.current = null;
	}, []);

	const handleClose = useCallback(() => {
		onClose && onClose(childRef.current, closingReasonRef.current);
		closingReasonRef.current = null;
	}, []);

	const handleEscapeKeyDown = useCallback((event) => {
		closingReasonRef.current = 'escapeKeyDown';
		onEscapeKeyDown && onEscapeKeyDown(event);
	}, []);

	const handleOutsideClick = useCallback((event) => {
		closingReasonRef.current = 'outsideClick';
		onOutsideClick && onOutsideClick(event);
	}, []);

	// If you can't find tabbable elements in your children,
	//  set the substitute element to 'tabIndex = 0' and focus
	const fallbackFocus = useCallback(() => {
		childRef.current.tabIndex = 0;
		return childRef.current;
	}, []);

	// when 'open' changes to false.
	if (shouldMountRef.current && !open && !isClosedRef.current) {
		isClosedRef.current = true;
		handleClose();
	}

	const enableCloseAfterTransition = closeAfterTransition && getHasTransition(children);

	// If you want to wait for the transition and then unmount,
	//  the procedure is as usual when 'open' changes to true.
	if (enableCloseAfterTransition) {
		if (!shouldMountRef.current && open) {
			shouldMountRef.current = open;
		}
	} else {
		shouldMountRef.current = open;
	}

	const isActive = modalManagerRef.current.isActive;

	const childProps = {
		...children.props
	};

	if (enableCloseAfterTransition) childProps.onExited = handleExited;

	const childComponent = <children.type {...childProps} refer={childRef} />;

	props.style = useMemo(
		() => {
			return {
				...(props.style ? props.style : {}),
				position: 'relative'
			};
		},
		[ props.style ]
	);

	const style = $styles.main;

	const Container = disableHideOtherAria ? DivElement : HideOtherAria;

	return (
		shouldMountRef.current && (
			<Portal container={container} onMount={handleMountedChild} onUnmount={handleUnmountChild}>
				<Container
					active={isActive}
					style={propStyle}
					classNames={[ $names.ucModal, ...propClassNames ]}
					refer={(element) => {
						containerRef.current = element;
						getElementRef(refer, element);
					}}
					{...props}
				>
					{!disableScrollLock && isActive && open && <ScrollLock target={scrollTarget || childRef} />}
					{isActive &&
					open &&
					!disableEscapeKeyDown && <HotKeys hotkeys={'escape'} action={handleEscapeKeyDown} />}
					{isActive &&
					open &&
					!disableOutsideClick && (
						<ClickOrTouchOnOutside
							target={childRef}
							action={handleOutsideClick}
							{...clickOrTouchOnOutsideProps}
						/>
					)}
					{!disableBackdrop && <Backdrop open={open} disablePointerEvents={!open} {...backdropProps} />}
					{disableEnforceFocus ? (
						<DivElement style={style}>{childComponent}</DivElement>
					) : (
						<FocusTrap
							active={isActive}
							style={style}
							disableRestoreFocus={disableRestoreFocus}
							fallbackFocus={!disableFallbackFocus && fallbackFocus}
							{...focustrapProps}
						>
							{childComponent}
						</FocusTrap>
					)}
				</Container>
			</Portal>
		)
	);
};

export default Modal;
