import React, { useMemo } from 'react';
import { css, cx } from 'emotion';
import style from './style';

const Base = ({
	elementType,
	children,
	style = {},
	className: propClassName,
	classNames: propClassNames = [],
	ids = [],
	id: propId = '',
	roles = [],
	role: propRole = '',
	refer,
	...props
}) => {
	const className = useMemo(
		() => {
			const classNames = propClassName ? [ propClassName ] : [];
			propClassNames.length !== 0 && classNames.push(propClassNames);
			return classNames.join(' ');
		},
		[ propClassName, propClassNames ]
	);

	if (propId) ids.push(propId);
	if (ids.length !== 0) props.id = ids.join(' ');

	if (propRole) roles.push(propRole);
	if (roles.length !== 0) {
		props.role = roles.join(' ');
	}

	return React.createElement(
		elementType,
		{
			className: cx(css({ ...style.allElementsCommonStyle, ...style }), className),
			ref: refer,
			...props
		},
		children
	);
};

export default Base;
