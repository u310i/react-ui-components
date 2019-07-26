import React from 'react';
import Base from './Base';

export const SvgElement = ({ style, ...props }) => {
  const mainStyle = {};
  return (
    <Base elementType="svg" style={{ ...mainStyle, ...style }} {...props} />
  );
};

export const GElement = ({ style, ...props }) => {
  const mainStyle = {};
  return (
    <Base elementType="g" style={{ ...mainStyle, ...style }} {...props} />
  );
};

export const SymbolElement = ({ style, ...props }) => {
  const mainStyle = {};
  return (
    <Base elementType="symbol" style={{ ...mainStyle, ...style }} {...props} />
  );
};

export const UseElement = ({ style, ...props }) => {
  const mainStyle = {};
  return (
    <Base elementType="use" style={{ ...mainStyle, ...style }} {...props} />
  );
};

export const TitleElement = ({ style, ...props }) => {
  const mainStyle = {};
  return (
    <Base elementType="title" style={{ ...mainStyle, ...style }} {...props} />
  );
};

export const DescElement = ({ style, ...props }) => {
  const mainStyle = {};
  return (
    <Base elementType="desc" style={{ ...mainStyle, ...style }} {...props} />
  );
};
