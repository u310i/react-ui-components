import React from 'react';
import { css } from 'react-emotion';

import { Heading1, Heading2 } from 'atoms/Typography';
import HeaderImage from 'molecules/HeaderImage';

export default ({
  theme,
  containerProps: {
    container = {},
    image = {},
    titleOuter = {},
    title = {},
    subTitle = {}
  }
}) => (
  <header
    className={css(container.style, {
      '& > .text': {
        ...titleOuter.style
      }
    })}
  >
    <div className="text">
      <Heading1 theme={theme} containerProps={title} />
      <Heading2 theme={theme} containerProps={subTitle} />
    </div>
    <HeaderImage containerProps={image} />
  </header>
);
