import * as React from 'react';
import Base from './Base';

export const SvgElement = ({ style, ...props }) => {
	return <Base tagName="svg" style={style} {...props} />;
};

export const GElement = ({ style, ...props }) => {
	return <Base tagName="g" style={style} {...props} />;
};

export const SymbolElement = ({ style, ...props }) => {
	return <Base tagName="symbol" style={style} {...props} />;
};

export const UseElement = ({ style, ...props }) => {
	return <Base tagName="use" style={style} {...props} />;
};

export const TitleElement = ({ style, ...props }) => {
	return <Base tagName="title" style={style} {...props} />;
};

export const DescElement = ({ style, ...props }) => {
	return <Base tagName="desc" style={style} {...props} />;
};
