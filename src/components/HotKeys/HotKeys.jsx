import React, { useEffect, useRef } from 'react';
import Mousetrap from 'mousetrap';
import { isReact } from 'scripts';

// https://github.com/ccampbell/mousetrap

const HotKeys = ({ children, hotkeys, action = (e) => {}, type, target }) => {
	const whichEvent = type === 'keydown' || type === 'keyup' || type === 'keypress' ? type : undefined;
	const mousetrapRef = useRef(null);
	useEffect(
		() => {
			if (mousetrapRef.current === null) {
				mousetrapRef.current = isReact(target) ? new Mousetrap(target) : Mousetrap;
			}
			const mousetrap = mousetrapRef.current;
			mousetrap.bind(hotkeys, action, whichEvent);
			return () => {
				mousetrap.unbind(hotkeys, whichEvent);
			};
		},
		[ hotkeys ]
	);

	return children || null;
};

export default HotKeys;
