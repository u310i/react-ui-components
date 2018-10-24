import React from 'react';
import { css } from 'react-emotion';

export default ({
  containerProps: {
    styles = {},
    attributes: { src = '', alt = '', ...attributes }
  }
}) => <img className={css(styles)} src={src} alt={alt} {...attributes} />;
