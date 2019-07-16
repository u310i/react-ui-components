import React, { useState, useMemo, useCallback, useEffect, useRef, useReducer } from 'react';
import $ from './_constants';
import { isNumber, getTransitionEndName, addEventListener, removeEventListener, getElementRef, getNode } from 'scripts';
import {
	DivElement,
	EventListener,
	Portal,
	HideOtherAria,
	Backdrop,
	Paper,
	FocusTrap,
	HotKeys,
	ClickOutside,
	ScrollLock
} from '..';

const $names = $.names;
const $styles = $.styles;

const getHasTransition = (children) => {
	return children ? children.props.hasOwnProperty('in') : false;
};

const modalQueue = [];
let zIndexCounter = $styles.modalZindex;

const Modal = ({
	children,
	container,
	open,
	onClose,
	onOpen,
	onEscapeKeyDown,
	onOutsideClick,
	keepMount = false,
	closeAfterTransition = false,
	disableEscapeKeyDown = false,
	disableOutsideClick = false,
	disableHideOtherAria = false,
	disableEnforceFocus = false,
	disableRestoreFocus = false,
	disableFallbackFocus = false,
	hideBackdrop = false,
	disableScrollLock = false,
	scrollTarget,
	clickOutsideProps = {},
	fallbackFocus,
	rootProps: propRootProps = {},
	contentProps: propContentProps = {},
	backdropProps: propBackdropProps = {},
	...props
}) => {
	const rootRef = useRef(null);
	const childRef = useRef(null);
	// Becomes true if 'open' is true,
	//  It will be false when the end transition is exited.
	const shouldBeMounted = useRef(null);
	const closingReasonRef = useRef(null);
	// It is true until 'open' changes to false and is unmounted.
	const inExitTransitionRef = useRef(null);
	const zIndexAdded = useRef(null);
	const isActivatedRef = useRef(null);

	const [ , forceUpdate ] = useReducer((x) => x + 1, 0);

	// A session to manage multiple modals.
	const modalManagerRef = useRef({ isActive: null, update: forceUpdate });

	if (open && !isActivatedRef.current) {
		isActivatedRef.current = true;
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

	if (!open && isActivatedRef.current) {
		isActivatedRef.current = null;
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
			zIndexCounter = $styles.modalZindex;
		}
	}

	useEffect(
		() => {
			if (open && !zIndexAdded.current) {
				rootRef.current.style.zIndex = zIndexCounter;
				zIndexCounter += 1;
			}
			zIndexAdded.current = open;
		},
		[ open ]
	);

	const handleEscapeKeyDown = useCallback(
		(event) => {
			closingReasonRef.current = 'escapeKeyDown';
			onEscapeKeyDown && onEscapeKeyDown(event);
			event.stopPropagation();
		},
		[ onEscapeKeyDown ]
	);

	const handleOutsideClick = useCallback(
		(event) => {
			closingReasonRef.current = 'outsideClick';
			onOutsideClick && onOutsideClick(event);
		},
		[ onOutsideClick ]
	);

	// If you can't find tabbable elements in your children,
	//  set the substitute element to 'tabIndex = 0' and focus
	const handleFallbackFocus = useCallback(
		() => {
			if (fallbackFocus) {
				const element = getNode(fallbackFocus);
				element.tabIndex = 0;
				return element;
			}
			childRef.current.tabIndex = 0;
			return childRef.current;
		},
		[ fallbackFocus ]
	);

	// If you want to unmount after waiting for the transition,
	//  use 'forceUpdate' to unmount after the transition.
	const onExitedOfChildren = children.props.onExited;
	const handleExited = useCallback(
		(node) => {
			if (closeAfterTransition) {
				inExitTransitionRef.current = null;
				shouldBeMounted.current = null;
				onExitedOfChildren && onExitedOfChildren(node);
				forceUpdate();
			}
		},
		[ closeAfterTransition, onExitedOfChildren ]
	);

	const handleOpen = useCallback(
		() => {
			shouldBeMounted.current = open;
			inExitTransitionRef.current = null;
			onOpen && onOpen();
		},
		[ open, onOpen ]
	);

	const handleClose = useCallback(() => {
		onClose && onClose(childRef.current, closingReasonRef.current);
		closingReasonRef.current = null;
	}, []);

	// when 'open' changes to false.
	if (shouldBeMounted.current && !open && !inExitTransitionRef.current) {
		inExitTransitionRef.current = true;
		handleClose();
	}

	const enableCloseAfterTransition = closeAfterTransition && getHasTransition(children);

	// If you want to wait for the transition and then unmount,
	//  the procedure is as usual when 'open' changes to true.
	if (enableCloseAfterTransition) {
		if (!shouldBeMounted.current && open) {
			handleOpen();
		}
	} else {
		handleOpen();
	}

	const { ...childProps } = children.props;

	if (enableCloseAfterTransition) childProps.onExited = handleExited;

	const handleChildRef = useCallback((element) => {
		childRef.current = element;
		getElementRef(childProps.refer, element);
	}, []);
	const childComponent = <children.type {...childProps} refer={handleChildRef} />;

	// 'useCallback' is never updated.
	const handleRootRef = useCallback((element) => {
		rootRef.current = element;
		getElementRef(propRootProps.refer, element);
	}, []);
	// The reason for not putting 'propRootProps' in 'useMemo' is to reflect the change of 'propRootProps'.
	// If you put it in 'useMemo', you need to add all the properties of 'propRootProps' to 'dependencies'.
	const rootProps = {
		...propRootProps,
		...useMemo(
			() => {
				return {
					style: {
						...$styles.container.style,
						...propRootProps.style
					},
					classNames: [ ...(propRootProps.classNames || []), $names.ucModal ],
					refer: handleRootRef
				};
			},
			[ propRootProps.style, propRootProps.classNames ]
		)
	};

	const contentProps = {
		...propContentProps,
		...useMemo(
			() => {
				return {
					style: {
						...$styles.content.style,
						...propContentProps.style
					},
					classNames: [ ...(propContentProps.classNames || []), $names.ucModalContent ]
				};
			},
			[ propContentProps.style, propContentProps.classNames ]
		)
	};

	if (!propBackdropProps.transitionProps) propBackdropProps.transitionProps = {};
	const backdropProps = {
		...propBackdropProps,
		...useMemo(
			() => {
				return {
					transitionProps: {
						disableHideVisibility: true,
						...propBackdropProps.transitionProps,
						style: {
							zIndex: $styles.backdropZindex,
							...propBackdropProps.transitionProps.style
						},
						classNames: [ ...(propBackdropProps.transitionProps.classNames || []), $names.ucModalBackdrop ]
					}
				};
			},
			// If you change the properties in 'transitionProps', you must update 'transitionProps' itself.
			[ propBackdropProps.classNames, propBackdropProps.transitionProps ]
		)
	};

	useEffect(
		() => {
			if (rootRef.current) {
				if (shouldBeMounted.current) {
					rootRef.current.style.visibility = null;
				} else {
					rootRef.current.style.visibility = 'hidden';
				}
			}
		},
		[ shouldBeMounted.current ]
	);

	const ContainerComponent = disableHideOtherAria ? DivElement : HideOtherAria;

	const ContentComponent = disableEnforceFocus ? DivElement : FocusTrap;

	const isActive = modalManagerRef.current.isActive;

	return (
		(keepMount || shouldBeMounted.current) && (
			<Portal container={container}>
				<ContainerComponent active={isActive} {...rootProps}>
					{!disableScrollLock && shouldBeMounted.current && <ScrollLock target={scrollTarget || childRef} />}
					{!disableEscapeKeyDown &&
					isActive &&
					open && <HotKeys hotkeys={'escape'} action={handleEscapeKeyDown} />}
					{!disableOutsideClick &&
					isActive &&
					open && <ClickOutside target={childRef} action={handleOutsideClick} {...clickOutsideProps} />}
					{!hideBackdrop && <Backdrop open={open} disablePointerEvents={!open} {...backdropProps} />}
					{disableEnforceFocus ? (
						<DivElement {...contentProps}>{childComponent}</DivElement>
					) : (
						<FocusTrap
							active={isActive}
							disableRestoreFocus={disableRestoreFocus}
							fallbackFocus={!disableFallbackFocus && handleFallbackFocus}
							{...contentProps}
						>
							{childComponent}
						</FocusTrap>
					)}
				</ContainerComponent>
			</Portal>
		)
	);
};

export default Modal;
