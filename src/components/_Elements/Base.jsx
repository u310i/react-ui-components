import React from 'react';
import { css, cx } from 'emotion';
import style from './style';

const Base = ({
	elementType,
	children,
	style = {},
	classNames = [],
	className: propClassName = '',
	ids = [],
	id: propId = '',
	roles = [],
	role: propRole = '',
	ref,
	refer,
	...props
}) => {
	if (propClassName) classNames.push(propClassName);
	let className = '';
	if (classNames.length !== 0) className = classNames.join(' ');

	if (propId) ids.push(propId);
	if (ids.length !== 0) props.id = ids.join(' ');

	if (propRole) roles.push(propRole);
	if (roles.length !== 0) {
		props.role = roles.join(' ');
	}

	ref = refer;

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
