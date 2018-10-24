import React from 'react';
import { css } from 'react-emotion';

const Heading1 = ({
  theme: {
    typography: {
      font: { h1 }
    }
  },
  containerProps: { textNode = '', styles = {} }
}) => <h1 className={css(h1, styles)}>{textNode}</h1>;

const Heading2 = ({
  theme: {
    typography: {
      font: { h2 }
    }
  },
  containerProps: { textNode = '', styles = {} }
}) => <h2 className={css(h2, styles)}>{textNode}</h2>;

const Heading3 = ({
  theme: {
    typography: {
      font: { h3 }
    }
  },
  containerProps: { textNode = '', styles = {} }
}) => <h3 className={css(h3, styles)}>{textNode}</h3>;

const Heading4 = ({
  theme: {
    typography: {
      font: { h4 }
    }
  },
  containerProps: { textNode = '', styles = {} }
}) => <h4 className={css(h4, styles)}>{textNode}</h4>;

const Heading5 = ({
  theme: {
    typography: {
      font: { h5 }
    }
  },
  containerProps: { textNode = '', styles = {} }
}) => <h5 className={css(h5, styles)}>{textNode}</h5>;

const Heading6 = ({
  theme: {
    typography: {
      font: { h6 }
    }
  },
  containerProps: { textNode = '', styles = {} }
}) => <h6 className={css(h6, styles)}>{textNode}</h6>;

export { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 };
