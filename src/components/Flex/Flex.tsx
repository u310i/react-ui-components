import * as React from 'react';

import { BaseElement } from '..';

const Flex = ({
	children,
	inline,
	direction,
	wrap,
	justifyContent,
	alignItems,
	alignContent,
	style: propStyle,
	nthChildStyleList = [],
	firstChildStyle,
	lastChildStyle,
	notNthChildStyleList = [],
	notFirstChildStyle,
	notLastChildStyle,
	initClassName = 'uc-flex',
	...props
}) => {
	const style = {};
	style.display = inline ? 'inline-flex' : 'flex';
	if (direction) style.flexDirection = direction;
	if (wrap) style.flexWrap = flexWrap;
	if (justifyContent) style.justifyContent = justifyContent;
	if (alignItems) style.alignItems = alignItems;
	if (alignContent) style.alignContent = alignContent;

	const nestedStyle = {};
	if (nthChildStyleList) {
		for (let [ n, style ] of nthChildStyleList) {
			nestedStyle[`& > :nth-child(${n})`] = style;
		}
	}
	if (firstChildStyle) {
		nestedStyle['& > :first-child'] = firstChildStyle;
	}
	if (lastChildStyle) {
		nestedStyle['& > :last-child'] = lastChildStyle;
	}
	if (notNthChildStyleList) {
		for (let [ n, style ] of notNthChildStyleList) {
			nestedStyle[`& > :not(:nth-child(${n}))`] = style;
		}
	}
	if (notFirstChildStyle) {
		nestedStyle['& > :not(:first-child)'] = notFirstChildStyle;
	}
	if (notLastChildStyle) {
		nestedStyle['& > :not(:last-child)'] = notLastChildStyle;
	}

	return (
		<BaseElement style={{ ...style, ...nestedStyle, ...propStyle }} {...props}>
			{children}
		</BaseElement>
	);
};

Flex.Row = ({ children, ...props }) => {
	return (
		<BaseElement classNames={[ 'uc-flex-row' ]} {...props}>
			{children}
		</BaseElement>
	);
};

Flex.Col = ({ children, direction = 'column', ...props }) => {
	return (
		<BaseElement direction={direction} classNames={[ 'uc-flex-col' ]} {...props}>
			{children}
		</BaseElement>
	);
};

Flex.Item = ({ children, style: propStyle, order, flexGrow, flexShrink, flexBasis, alignSelf, ...props }) => {
	const style = {};
	if (order) style.order = order;
	if (flexGrow) style.flexGrow = flexGrow;
	if (flexShrink) style.flexShrink = flexShrink;
	if (flexBasis) style.flexBasis = flexBasis;
	if (alignSelf) style.alignSelf = alignSelf;
	return (
		<BaseElement tagName="div" style={{ ...style, ...propStyle }} classNames={[ 'uc-flex-item' ]} {...props}>
			{children}
		</BaseElement>
	);
};

export default Flex;
