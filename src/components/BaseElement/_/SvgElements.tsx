import * as React from 'react';
import Base from './Base';

export const SvgElement = ({ style, ...props }) => {
	return <Base elementName="svg" style={style} {...props} />;
};

export const GElement = ({ style, ...props }) => {
	return <Base elementName="g" style={style} {...props} />;
};

export const SymbolElement = ({ style, ...props }) => {
	return <Base elementName="symbol" style={style} {...props} />;
};

export const UseElement = ({ style, ...props }) => {
	return <Base elementName="use" style={style} {...props} />;
};

export const TitleElement = ({ style, ...props }) => {
	return <Base elementName="title" style={style} {...props} />;
};

export const DescElement = ({ style, ...props }) => {
	return <Base elementName="desc" style={style} {...props} />;
};
