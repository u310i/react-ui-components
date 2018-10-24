import React from 'react';
import { css } from 'react-emotion';

export default ({
  containerProps: {
    textNode = '',
    attributes: { href = '#', ...attributes },
    styles = {}
  }
}) => (
  <a href={href} className={css(styles)} {...attributes}>
    {textNode}
  </a>
);
