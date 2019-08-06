import React from 'react';
import $ from './_constants';
import {} from 'scripts';
import { BaseElement } from '..';

const $names = $.names;
const $styles = $.styles;

const Paper = ({ children, elevation = 2, shape = 'default', ...props }) => {
	const _style_ = React.useMemo(
		() => {
			return {
				...$styles.style,
				borderRadius: $.shape[shape],
				boxShadow: $.shadow[elevation],
				backgroundColor: $.color
			};
		},
		[ shape, elevation ]
	);

	return (
		<BaseElement tagName="div" _style_={_style_} _className_={$names.ucPaper} {...props}>
			{children}
		</BaseElement>
	);
};

export default Paper;
