import React from 'react';
import Base from './Base';

export const Svg = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Base
      elementType="svg"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const G = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Base elementType="g" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Symbol = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Base
      elementType="symbol"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Use = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Base
      elementType="use"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Title = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Base
      elementType="title"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Desc = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Base
      elementType="desc"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};
