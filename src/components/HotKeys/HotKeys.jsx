import React  from 'react';
import { getNode, mousetrap as Mousetrap } from 'scripts';

// https://github.com/ccampbell/mousetrap

const HotKeys = ({ children, hotkeys, action = (e) => {}, type, target, active = true }) => {
	const whichEvent = type === 'keydown' || type === 'keyup' || type === 'keypress' ? type : undefined;
	const mousetrapRef = React.useRef(null);
	const prevActive = React.useRef(null);
	const didBindRef = React.useRef(null);
	React.useEffect(
		() => {
			if (mousetrapRef.current === null) {
				mousetrapRef.current = getNode(target) ? Mousetrap(target) : Mousetrap;
			}
			const mousetrap = mousetrapRef.current;
			if (!prevActive.current && active) {
				// If the same key action is 'bind' in multiple components,
				// 'unbind' on 'will unmount' can cause everything to 'unbind'.
				// It uses 'setTimeout' to 'bind' after 'unbind' other components.
				// 同じキーアクションを複数コンポーネントで'bind'させると、
				// 'will unmount'上の'unbind'によって全てが'unbind'してしまう可能性がある。
				// 他のコンポーネントの'unbind'よりあとに'bind'させるために'setTimeout'を使用している。
				setTimeout(() => {
					mousetrap.bind(hotkeys, action, whichEvent);
					didBindRef.current = true;
				});
			} else if (prevActive.current && !active) {
				if (didBindRef.current) {
					didBindRef.current && mousetrap.unbind(hotkeys, whichEvent);
					didBindRef.current = null;
				}
			}
			prevActive.current = active;
			return () => {
				if (didBindRef.current) {
					mousetrap.unbind(hotkeys, whichEvent);
					didBindRef.current = null;
				}
			};
		},
		[ active ]
	);

	return children || null;
};

export default HotKeys;
