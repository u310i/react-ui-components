import React, { useState, useMemo, useCallback, useEffect, useRef, useReducer } from 'react';
import $ from './_constants';
import { isNumber, getTransitionEndName, addEventListener, removeEventListener } from 'scripts';
import {
	DivElement,
	EventListener,
	Portal,
	HideOtherAria,
	Backdrop,
	Paper,
	FocusTrap,
	HotKeys,
	ClickOrTouchOnOutside
} from '..';

const $names = $.names;
const $styles = $.styles;

const Empty = ({ onMount, onUnmount }) => {
	useEffect(() => {
		onMount && onMount();
		return () => {
			onUnmount && onUnmount();
		};
	}, []);
	return <React.Fragment />;
};
let i = 0;
const cancel = (e) => {
	i += 1;
	console.log('++++++++++cancel ');
};
const Modal = ({
	children,
	refer,
	style: propStyle = {},
	classNames: propClassNames = [],
	mountNode,
	open,
	onClose,
	onRendered,
	onEscapeKeyDown,
	onOutsideClick,
	closeAfterTransition = false,
	disableEscapeKeyDown = false,
	disableOutsideClick = false,
	disableHideOtherAria = false,
	disableEnforceFocus = false,
	disableRestoreFocus = false,
	hideBackdrop = false,
	propsOfHideOtherAria = {},
	propsOfClickOrTouchOnOutside = {},
	propsOfBackdrop = {},
	propsOfFocustrap = {}
}) => {
	const mountedChildRef = useRef(null);
	const childRef = useRef(null);
	const openRef = useRef(null);
	const closingReasonRef = useRef(null);

	const addedCloseAfterTransitionEventRef = useRef(null);
	const [ , forceUpdate ] = useReducer((x) => x + 1, 0);

	const enableCloseAfterTransition = closeAfterTransition && getTransitionEndName();

	const handleRendered = useCallback(() => {
		onRendered(childRef.current);
	}, []);

	const handleClose = useCallback(() => {
		if (enableCloseAfterTransition) {
			addEventListener(childRef.current, getTransitionEndName(), handleCloseAfterTransition);
			addEventListener(childRef.current, 'transitioncancel', cancel);
			addedCloseAfterTransitionEventRef.current = true;
		}
		onClose && onClose(childRef.current, closingReasonRef.current);
		closingReasonRef.current = null;
	}, []);

	const handleCloseAfterTransition = useCallback((event) => {
		openRef.current = null;
		forceUpdate();
	}, []);

	const handleEscapeKeyDown = useCallback((event) => {
		event.stopPropagation();
		closingReasonRef.current = 'escapeKeyDown';
		onEscapeKeyDown && onEscapeKeyDown(event);
	}, []);

	const handleOutsideClick = useCallback((event) => {
		closingReasonRef.current = 'outsideClick';
		onOutsideClick && onOutsideClick(event);
	}, []);

	if (enableCloseAfterTransition && addedCloseAfterTransitionEventRef.current && !openRef.current && !open) {
		console.log('remove close after transition event');
		addedCloseAfterTransitionEventRef.current = null;
		removeEventListener(childRef.current, getTransitionEndName(), handleCloseAfterTransition);
		removeEventListener(childRef.current, 'transitioncancel', cancel);
	}

	if (enableCloseAfterTransition) {
		if (!openRef.current && open) {
			openRef.current = open;
		}
	} else {
		openRef.current = open;
	}
	console.log('openRef:  ' + openRef.current);

	const childComponent = <children.type {...children.props} refer={childRef} />;

	const style = $styles.main;

	const HideOtherAriaOrDiv = disableHideOtherAria ? DivElement : HideOtherAria;

	return (
		openRef.current && (
			<Portal mountNode={mountNode}>
				<HideOtherAriaOrDiv
					style={propStyle}
					classNames={[ $names.ucModal, ...propClassNames ]}
					refer={refer}
					{...(disableHideOtherAria ? {} : propsOfHideOtherAria)}
				>
					{open && !disableEscapeKeyDown && <HotKeys hotkeys={[ 'escape' ]} action={handleEscapeKeyDown} />}
					{!hideBackdrop && <Backdrop open={open} {...propsOfBackdrop} />}
					{open &&
					!disableOutsideClick && (
						<ClickOrTouchOnOutside
							target={childRef}
							action={handleOutsideClick}
							{...propsOfClickOrTouchOnOutside}
						/>
					)}
					{disableEnforceFocus ? (
						<DivElement style={style}>{childComponent}</DivElement>
					) : (
						<FocusTrap
							style={style}
							disableRestoreFocus={disableRestoreFocus}
							fallbackFocus={() => childRef.current}
							{...propsOfFocustrap}
						>
							{childComponent}
						</FocusTrap>
					)}
					{open && <Empty onMount={handleRendered} onUnmount={handleClose} />}
				</HideOtherAriaOrDiv>
			</Portal>
		)
	);
};

export default Modal;
