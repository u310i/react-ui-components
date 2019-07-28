import * as React from 'react';
import { css } from 'react-emotion';

export default ({
  text,
  attribute: { href = '#', ...attribute },
  style = {}
}) => (
  <a href={href} className={css(style)} {...attribute}>
    {text}
  </a>
);
