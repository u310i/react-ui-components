import React  from 'react';
import $ from './_constants';
import {} from 'scripts';
import { DivElement } from '..';

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
		<DivElement _style_={_style_} _className_={$names.ucPaper} {...props}>
			{children}
		</DivElement>
	);
};

export default Paper;
