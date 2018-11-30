import React from 'react';
import { css } from 'react-emotion';

export default ({
  containerProps: {
    style = {},
    attribute: { src = '', alt = '', ...attribute }
  }
}) => <img className={css(style)} src={src} alt={alt} {...attribute} />;
