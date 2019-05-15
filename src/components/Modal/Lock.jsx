import React, { useState, useMemo, useCallback, useLayoutEffect, useRef } from 'react';
import { isArray, isUndefined, isNumber, isFunction } from 'scripts';
import { DivElement, EventListener, Portal } from '..';

const Lock = ({ children, ...props }) => {
	const showOthers = useRef(null);

	const onKeyPress = useCallback((e) => {
		if (e.defaultPrevented) return;
		const code = e.key || e.keyCode;
		if ((e.code === 'Escape' || code === 'Escape' || code === 27) && this.props.onEscapeKey) {
			onEscapeKey(e);
		}
	}, []);

	const onClick = useCallback((e) => {
		if (event.defaultPrevented) return;
		if (props.onClickOutside) {
			props.onClickOutside();
		}
	});

	const onActivation = (node) => {
		showOthers.current = hideOthers(node, document.body);
		if (props.onActivation) props.onActivation();
		document.addEventListener('keyup', onKeyPress);
		document.addEventListener('click', onClick);
	};

	const onDeactivation = (node) => {
		showOthers();
		if (props.onDeactivation) props.onDeactivation();
		document.removeEventListener('keyup', onKeyPress);
		document.removeEventListener('click', onClick);
	};

	return (
		<React.Fragment>
			<FocusLock>{children}</FocusLock>
		</React.Fragment>
	);
};
