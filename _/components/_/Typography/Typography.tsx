import * as React from 'react';
import { css } from 'react-emotion';

const Heading1 = ({
  theme: {
    typography: {
      font: { h1 }
    }
  },
  containerProps: { textNode = '', style = {} }
}) => <h1 className={css(h1, style)}>{textNode}</h1>;

const Heading2 = ({
  theme: {
    typography: {
      font: { h2 }
    }
  },
  containerProps: { textNode = '', style = {} }
}) => <h2 className={css(h2, style)}>{textNode}</h2>;

const Heading3 = ({
  theme: {
    typography: {
      font: { h3 }
    }
  },
  containerProps: { textNode = '', style = {} }
}) => <h3 className={css(h3, style)}>{textNode}</h3>;

const Heading4 = ({
  theme: {
    typography: {
      font: { h4 }
    }
  },
  containerProps: { textNode = '', style = {} }
}) => <h4 className={css(h4, style)}>{textNode}</h4>;

const Heading5 = ({
  theme: {
    typography: {
      font: { h5 }
    }
  },
  containerProps: { textNode = '', style = {} }
}) => <h5 className={css(h5, style)}>{textNode}</h5>;

const Heading6 = ({
  theme: {
    typography: {
      font: { h6 }
    }
  },
  containerProps: { textNode = '', style = {} }
}) => <h6 className={css(h6, style)}>{textNode}</h6>;

export { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 };
