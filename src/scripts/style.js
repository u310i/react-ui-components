import {
  fromCamelCase,
  extractOverlapObjectProperty,
  isArray,
  isString,
  isNumber
} from 'scripts';

import { keyframes as emotionKeyframes } from 'react-emotion';

export const keyframes = emotionKeyframes;

export const reflow = node => node.scrollTop;

export const getFontSize = data => {
  if (isNumber(data)) return `${Math.round(data * 100) / 100}px`;
  if (!isString(data)) return '1em';
  switch (data) {
    case 'xs':
      return '.75em';
    case 'sm':
      return '.875em';
    case 'lg':
      return '1.33333em';
    default:
      const match = data.match(/^([2-9]|10)x$/);
      if (match) {
        return `${match[1]}em`;
      }
      return data;
  }
};

export const genTransitionProp = list => {
  let transitionProp = [];
  for (let prop of list) {
    transitionProp.push(
      [
        prop[0] ? prop[0] : 'all',
        prop[1] ? `${prop[1]}ms` : '0ms',
        prop[2] && prop[2],
        prop[3] && `${prop[3]}ms`
      ].join(' ')
    );
  }
  return transitionProp.join(', ');
};

export const genTransitionProperty = style => {
  return Object.keys(style)
    .map(value => {
      return fromCamelCase(value, '-');
    })
    .join();
};

export const genReactCSSTransitionStyle = (name, fn, isAppear = false) => {
  const {
    defaultStyle,
    appear,
    appearActive,
    enter,
    enterActive,
    enterDone,
    exit,
    exitActive,
    exitDone
  } = fn();

  return {
    ...(defaultStyle || {}),
    [`&.${name}-appear`]: isAppear ? appear || enter : {},
    [`&.${name}-appear-active`]: isAppear ? appearActive || enterActive : {},
    [`&.${name}-enter`]: enter,
    [`&.${name}-enter-active`]: enterActive,
    [`&.${name}-enter-done`]: enterDone || exit,
    [`&.${name}-exit`]: exit,
    [`&.${name}-exit-active`]: exitActive,
    [`&.${name}-exit-done`]: exitDone || enter
  };
};

export const genSimpleTransitionStyle = (
  name,
  { defaultStyle, beforeStyle: preBeforeStyle, afterStyle, baseStyle },
  duration,
  timingFunction,
  isAppear = false
) => {
  const beforeStyle = baseStyle
    ? {
        ...extractOverlapObjectProperty(afterStyle, baseStyle),
        ...preBeforeStyle
      }
    : preBeforeStyle;
  const transitionProperty = genTransitionProperty({
    ...beforeStyle,
    ...afterStyle
  });

  return genReactCSSTransitionStyle(
    name,
    () => {
      return {
        defaultStyle: defaultStyle,
        enter: beforeStyle,
        enterActive: {
          ...afterStyle,
          transitionProperty: transitionProperty,
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: timingFunction
        },
        exit: afterStyle,
        exitActive: {
          ...beforeStyle,
          transitionProperty: transitionProperty,
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: timingFunction
        }
      };
    },
    isAppear
  );
};

export const assignTransitionDuration = (
  name,
  style,
  duration,
  isAppear = false
) => {
  return {
    [`&.${name}-appear-active`]: isAppear
      ? {
          ...style[`&.${name}-appear-active`],
          transitionDuration: `${duration}ms`
        }
      : {},
    [`&.${name}-enter-active`]: {
      ...style[`&.${name}-enter-active`],
      transitionDuration: `${duration}ms`
    },
    [`&.${name}-exit-active`]: {
      ...style[`&.${name}-exit-active`],
      transitionDuration: `${duration}ms`
    }
  };
};
