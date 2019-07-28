import * as React from 'react';
import { css, cx } from 'emotion';
import baseStyle from './style';
import { getElementRef } from 'scripts';
import * as CSS from 'csstype';

type Arias = {
	[key: string]: string | boolean | number;
};

type Refer =
	| {
			current: null | any;
		}
	| ((element: any) => void);

type props<HtmlElement> = {
	elementType: string;
	children;
	_style_: CSS.Properties;
	style: CSS.Properties;
	_className_: string;
	classNames: string[];
	className: string;
	_id_: string;
	ids: string[];
	id: string;
	_arias_: arias;
	arias: arias;
	_refer_: Refer;
	refer: Refer;
} & HtmlElement;

const Base: React.FC<props<{ [key: string]: string }>> = (props) => {
	const {
		elementType,
		children,
		_style_,
		style: propStyle,
		_className_,
		classNames: propClassNames,
		className: propClassName,
		_id_,
		ids: propIds,
		id: propId,
		_arias_,
		arias: propArias,
		_refer_,
		refer: propRefer,
		...other
	} = props;

	const style = React.useMemo(
		() => {
			return { ...baseStyle.allElementsCommonStyle, ..._style_, ...propStyle };
		},
		[ _style_, propStyle ]
	);

	const className = React.useMemo(
		() => {
			return (
				[
					...(propClassName ? [ propClassName ] : []),
					...(propClassNames || []),
					...(_className_ ? [ _className_ ] : [])
				].join(' ') || null
			);
		},
		[ _className_, propClassNames, propClassName ]
	);

	const id = React.useMemo(
		() => {
			return [ ...(propId ? [ propId ] : []), ...(propIds || []), ...(_id_ ? [ _id_ ] : []) ].join(' ') || null;
		},
		[ _id_, propIds, propId ]
	);

	const arias = React.useMemo(
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

	const refer = React.useCallback((element) => {
		getElementRef<string>(propRefer, element);
		getElementRef(_refer_, element);
	}, []);

	return React.createElement(
		elementType,
		{
			className: cx(css(style), className),
			id: id,
			ref: refer,
			...arias,
			...other
		},
		children
	);
};

export default Base;
