import React, { useMemo } from 'react';
import { getComponentConstants } from 'scripts';
import { isHorizontal } from '../Drawer/Drawer';
import { DivElement } from '..';

const $ = getComponentConstants('swipeable_drawer');

const $swipeAreaStyles = $.styles.swipeArea;
const $names = $.names;

const SwipeArea = ({ anchor, width, ...props }) => {
	const _style_ = useMemo(
		() => {
			return {
				...$swipeAreaStyles.style,
				...$swipeAreaStyles[anchor].style,
				[isHorizontal(anchor) ? 'width' : 'height']: width
			};
		},
		[ anchor, width ]
	);
	return <DivElement _style_={_style_} _className_={$names.ucSwipeable_drawerArea} {...props} />;
};

export default SwipeArea;
