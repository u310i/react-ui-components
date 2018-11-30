import React from 'react';
import { css, cx } from 'react-emotion';

export default ({
  containerProps: {
    textNode = '',
    attribute: { href = '#', ...attribute },
    style = {}
  }
}) => (
  <a href={href} className={cx(css(style), 'ui-link')} {...attribute}>
    {textNode}
  </a>
);
