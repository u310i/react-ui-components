import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import $ from './_constants';
import { isNumber } from 'scripts';
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
// import { FocusOn } from 'react-focus-on';

const $names = $.names;

const Modal = ({
	children,
	style: propStyle = {},
	classNames: propClassNames = [],
	mountNode,
	open,
	onClose,
	onEscape,
	onOutsideClick,
	disableEscape = false,
	disableOutsideClick = false,
	disableHideOtherAria = false,
	disableRestoreFocus = false,
	disableAutoFocus = false,
	hideBackdrop = false
}) => {
	const style = {
		position: 'fixed',
		top: 0,
		left: 0,
		zIndex: 1300
	};

	const ref = useRef(null);

	const Container = disableHideOtherAria ? DivElement : HideOtherAria;

	return (
		open && (
			<Portal mountNode={mountNode}>
				<Container style={propStyle} classNames={[ $names.ucModa, ...propClassNames ]}>
					{!disableEscape && <HotKeys hotkeys={[ 'esc', 'escape' ]} action={onEscape} />}
					{!hideBackdrop && <Backdrop />}
					{!disableOutsideClick && (
						<ClickOrTouchOnOutside
							target={ref}
							action={() => {
								console.log('close');
							}}
						/>
					)}
					{disableAutoFocus ? (
						<DivElement style={style}>{children}</DivElement>
					) : (
						<FocusTrap
							style={style}
							options={{ returnFocusOnDeactivate: !disableRestoreFocus }}
							refer={ref}
						>
							{children}
						</FocusTrap>
					)}
				</Container>
			</Portal>
		)
	);
};

export default Modal;
