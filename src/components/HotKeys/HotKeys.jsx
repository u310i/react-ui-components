import React, { useEffect, useRef } from 'react';
import Mousetrap from 'mousetrap';
import { isReact } from 'scripts';

// https://github.com/ccampbell/mousetrap

const HotKeys = ({ children, hotkeys, action = () => {}, option = {} }) => {
	const optionType = option.type;
	const type =
		optionType === 'keydown' || optionType === 'keyup' || optionType === 'keypress' ? optionType : undefined;
	const mousetrapRef = useRef(null);
	useEffect(
		() => {
			if (mousetrapRef.current === null) {
				const optionTarget = option.target;
				mousetrapRef.current = isReact(optionTarget) ? new Mousetrap(optionTarget) : Mousetrap;
			}
			const mousetrap = mousetrapRef.current;
			mousetrap.bind(hotkeys, action, type);
			return () => {
				mousetrap.unbind(hotkeys, type);
			};
		},
		[ hotkeys ]
	);

	return children || null;
};

export default HotKeys;
