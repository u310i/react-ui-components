import React, { useEffect } from 'react';
import Mousetrap from 'mousetrap';
import { isReact } from 'scripts';

// https://github.com/ccampbell/mousetrap

const HotKeys = ({ children, hotkeys, callback, option = {} }) => {
	let type;
	switch (option.type) {
		case 'keydown':
		case 'keyup':
		case 'keypress':
			type = option.type;
			break;
	}

	const mousetrap = isReact(option.target) ? new Mousetrap(option.target) : Mousetrap;

	useEffect(
		() => {
			mousetrap.bind(
				hotkeys,
				() => {
					typeof callback === 'function' && callback;
				},
				type
			);
			return () => {
				mousetrap.unbind(hotkeys, type);
			};
		},
		[ hotkeys ]
	);

	return children || null;
};

export default HotKeys;
