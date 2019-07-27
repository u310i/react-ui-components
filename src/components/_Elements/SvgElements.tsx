import React from 'react';
import Base from './Base';

export const SvgElement = ({ style, ...props }) => {
	return <Base elementType="svg" style={style} {...props} />;
};

export const GElement = ({ style, ...props }) => {
	return <Base elementType="g" style={style} {...props} />;
};

export const SymbolElement = ({ style, ...props }) => {
	return <Base elementType="symbol" style={style} {...props} />;
};

export const UseElement = ({ style, ...props }) => {
	return <Base elementType="use" style={style} {...props} />;
};

export const TitleElement = ({ style, ...props }) => {
	return <Base elementType="title" style={style} {...props} />;
};

export const DescElement = ({ style, ...props }) => {
	return <Base elementType="desc" style={style} {...props} />;
};
