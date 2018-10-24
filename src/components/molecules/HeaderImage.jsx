import React from 'react';
import Image from 'atoms/Image';

export default ({
  containerProps: {
    attributes = {},
    styles: { height, ...styles }
  }
}) => (
  <Image
    containerProps={{
      styles: {
        width: '100%',
        objectFit: 'cover',
        height: height || '568px',
        ...styles
      },
      attributes: attributes
    }}
  />
);
