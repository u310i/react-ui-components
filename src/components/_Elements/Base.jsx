import React, { useMemo, useCallback } from 'react';
import { css, cx } from 'emotion';
import baseStyle from './style';
import { getElementRef } from 'scripts';

const Base = ({
	elementType,
	children,
	_style_,
	style: propStyle,
	_className_ = '',
	classNames: propClassNames = [],
	className: propClassName = '',
	_id_ = '',
	ids: propIds = [],
	id: propId = '',
	_arias_ = {},
	arias: propArias = {},
	_refer_,
	refer: propRefer,
	...props
}) => {
	const style = useMemo(
		() => {
			return { ...baseStyle.allElementsCommonStyle, ..._style_, ...propStyle };
		},
		[ _style_, propStyle ]
	);

	const className = useMemo(
		() => {
			return (
				[
					...(_className_ ? [ _className_ ] : []),
					...(propClassNames || []),
					...(propClassName ? [ propClassName ] : [])
				].join(' ') || null
			);
		},
		[ _className_, propClassNames, propClassName ]
	);

	const id = useMemo(
		() => {
			return [ ...(_id_ ? [ _id_ ] : []), ...(propIds || []), ...(propId ? [ propId ] : []) ].join(' ') || null;
		},
		[ _id_, propIds, propId ]
	);

	const arias = useMemo(
		() => {
			const baseArias = {
				..._arias_,
				...propArias
			};
			const arias = {};
			for (let key of Object.keys(baseArias)) {
				arias[`aria-${key}`] = baseArias[key];
			}
			return arias;
		},
		[ _arias_, propArias ]
	);

	const refer = useCallback((element) => {
		getElementRef(propRefer, element);
		getElementRef(_refer_, element);
	}, []);

	return React.createElement(
		elementType,
		{
			className: cx(css(style), className),
			id: id,
			ref: refer,
			...arias,
			...props
		},
		children
	);
};

export default Base;
