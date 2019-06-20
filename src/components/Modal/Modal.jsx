import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import $ from './_constants';
import { isNumber, getTransitionEndName } from 'scripts';
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
	onAfterTransition,
	closeAfterTransition = false,
	disableEscapeKeyDown = false,
	disableOutsideClick = false,
	disableHideOtherAria = false,
	disableRestoreFocus = false,
	disableAutoFocus = false,
	hideBackdrop = false,
	propsOfHideOtherAria = {},
	propsOfClickOrTouchOnOutside = {},
	propsOfBackdrop = {},
	propsOfFocustrap = {}
}) => {
	const mountedChildRef = useRef(false);
	const childRef = useRef(null);
	const openRef = useRef(false);

	useEffect(
		() => {
			if (childRef.current && !mountedChildRef.current) {
				mountedChildRef.current = true;
			}
			if (!childRef.current && mountedChildRef.current) {
				mountedChildRef.current = false;
			}
			if (mountedChildRef.current && open) {
				mountedChildRef.current = false;
				onRendered(childRef.current);
			}
		},
		[ open ]
	);

	const handleEscapeKeyDown = useCallback(
		(event) => {
			event.stopPropagation();
			onClose && onClose(event, 'escapeKeyDown');
			onEscapeKeyDown && onEscapeKeyDown(event);
		},
		[ onClose, onEscapeKeyDown ]
	);

	const handleOutsideClick = useCallback(
		(event) => {
			onClose && onClose(event, 'outsideClick');
			onOutsideClick && onOutsideClick(event);
		},
		[ onClose, onOutsideClick ]
	);

	const addedCloseAfterTransitionEventRef = useRef(false);
	const [ _updateForCloseAfterTransitionState, updateForCloseAfterTransition ] = useState(false);

	const onCloseAfterTransition = useCallback(
		() => {
			openRef.current = false;
			onAfterTransition && onAfterTransition();
			updateForCloseAfterTransition((prev) => !prev);
		},
		[ onAfterTransition ]
	);

	if (closeAfterTransition && getTransitionEndName()) {
		if (!openRef.current && open) {
			openRef.current = true;
		} else if (!addedCloseAfterTransitionEventRef.current && openRef.current && !open) {
			childRef.current.addEventListener(getTransitionEndName(), onCloseAfterTransition);
			addedCloseAfterTransitionEventRef.current = true;
		} else if (addedCloseAfterTransitionEventRef.current && !openRef.current && !open) {
			childRef.current.removeEventListener(getTransitionEndName(), onCloseAfterTransition);
			addedCloseAfterTransitionEventRef.current = false;
			openRef.current = false;
		}
	} else {
		openRef.current = open;
	}

	const childNode = <children.type {...children.props} refer={childRef} />;

	const style = $styles.main;

	const HideOtherAriaOrDiv = disableHideOtherAria ? DivElement : HideOtherAria;

	return (
		openRef.current && (
			<Portal mountNode={mountNode}>
				<HideOtherAriaOrDiv
					style={propStyle}
					classNames={[ $names.ucModa, ...propClassNames ]}
					refer={refer}
					{...propsOfHideOtherAria}
				>
					{open && !disableEscapeKeyDown && <HotKeys hotkeys={[ 'escape' ]} action={handleEscapeKeyDown} />}
					{!hideBackdrop && <Backdrop open={open} {...propsOfBackdrop} />}
					{open &&
					!disableOutsideClick && (
						<ClickOrTouchOnOutside
							targetRef={childRef}
							action={handleOutsideClick}
							{...propsOfClickOrTouchOnOutside}
						/>
					)}
					{disableAutoFocus ? (
						<DivElement style={style}>{childNode}</DivElement>
					) : (
						<FocusTrap style={style} returnFocusOnDeactivate={!disableRestoreFocus} {...propsOfFocustrap}>
							{childNode}
						</FocusTrap>
					)}
				</HideOtherAriaOrDiv>
			</Portal>
		)
	);
};

export default Modal;
