import React, { useMemo } from 'react';
import { css, cx } from 'emotion';
import style from './style';

const Base = ({
	elementType,
	children,
	style = {},
	className: propClassName = '',
	classNames: propClassNames = [],
	ids: propIds = [],
	id: propId = '',
	roles: propRoles = [],
	role: propRole = '',
	aria: propArias = {},
	refer,
	...props
}) => {
	const className = useMemo(
		() => {
			return [ ...(propClassName ? [ propClassName ] : []), ...(propClassNames || []) ].join(' ') || null;
		},
		[ propClassName, propClassNames ]
	);

	props.id = useMemo(
		() => {
			return [ ...(propId ? [ propId ] : []), ...(propIds || []) ].join(' ') || null;
		},
		[ propId, propIds ]
	);

	props.role = useMemo(
		() => {
			return [ ...(propRole ? [ propRole ] : []), ...(propRoles || []) ].join(' ') || null;
		},
		[ propRole, propRoles ]
	);

	const arias = {};
	for (let key of Object.keys(propArias)) {
		arias[`aria-${key}`] = propArias[key];
	}

	return React.createElement(
		elementType,
		{
			className: cx(css({ ...style.allElementsCommonStyle, ...style }), className),
			ref: refer,
			...arias,
			...props
		},
		children
	);
};

export default Base;
