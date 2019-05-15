import React, { useState, useMemo, useCallback, useLayoutEffect, useRef } from 'react';
import {} from 'scripts';
import { DivElement, Portal, HideOtherAria } from '..';
import EventListener from '.';

const KeyEventListener = ({ children, type = 'keyup', key, onKeyPress }) => {
	const callback = useCallback(
		(e) => {
			if (e.defaultPrevented) {
				return;
			}

			const code = e.key || e.keyCode;
			if ((e.code === 'Escape' || code === 'Escape' || code === 27) && onKeyPress) {
				onKeyPress(e);
			}
		},
		[ key ]
	);

	return (
		<EventListener type={type} callback={callback}>
			{children}
		</EventListener>
	);
};

export default KeyEventListener;
