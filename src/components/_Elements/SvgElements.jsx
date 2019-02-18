import React from 'react';
import Base from './Base';

export const Svg = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base
      elementType="svg"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const G = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base elementType="g" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Symbol = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base
      elementType="symbol"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Use = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base
      elementType="use"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Title = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base
      elementType="title"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Desc = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Base
      elementType="desc"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};
