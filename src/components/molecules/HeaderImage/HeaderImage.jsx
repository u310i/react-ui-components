import React from 'react';
import Image from 'atoms/Image';

export default ({
  containerProps: {
    attribute = {},
    style: { height, ...style }
  }
}) => (
  <Image
    containerProps={{
      style: {
        width: '100%',
        objectFit: 'cover',
        height: height || '568px',
        ...style
      },
      attribute: attribute
    }}
  />
);
