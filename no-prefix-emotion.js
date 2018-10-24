import React from 'react';
import createEmotion from 'create-emotion';
import createEmotionStyled from 'create-emotion-styled';

const context = typeof global !== 'undefined' ? global : {};

const emotion = createEmotion(context, { prefix: false });

export default createEmotionStyled(emotion, React);
export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  caches
} = emotion;
