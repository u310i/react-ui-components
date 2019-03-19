import React from 'react';
import Base from './Base';

export const SvgElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base elementType="svg" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const GElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base elementType="g" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const SymbolElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base elementType="symbol" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const UseElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base elementType="use" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const TitleElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base elementType="title" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const DescElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base elementType="desc" style={{ ...solidStyle, ...style }} {...props} />
  );
};
