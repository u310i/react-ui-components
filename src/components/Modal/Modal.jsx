import React, { useState, useMemo, useCallback, useLayoutEffect, useRef } from 'react';
import $ from './_materials';
import { isUndefined, isNumber, isFunction } from 'scripts';
import { DivElement, EventListener, Portal } from '..';
import { FocusOn } from 'react-focus-on';

const $names = $.names;

const Modal = ({ children, mountNode, open, onClickOutside, onEscapeKey }) => {
	const style = {
		position: 'fixed',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1300
	};
	return (
		open && (
			<Portal mountNode={mountNode}>
				<div style={style}>
					<FocusOn enabled={open} onClickOutside={onClickOutside} onEscapeKey={onEscapeKey}>
						{children}
					</FocusOn>
				</div>
			</Portal>
		)
	);
};

export default Modal;
