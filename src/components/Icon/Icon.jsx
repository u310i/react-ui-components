import React, { useState, useEffect, useMemo, useRef } from 'react';

import {
  roundNumber,
  testCssNumberRegExp,
  getType,
  isString,
  isArray,
  isObject,
  getFontSize,
  keyframes
} from 'utilities';
import { getIcon } from './utils';

import SVG from 'components/SVG';

const Icon = ({
  icon,
  style: propStyle = {},
  classNames = [],
  ids = [],
  role = 'icon',
  symbol,
  use,
  currentColor,
  size,
  fixedWidth,
  pull,
  border,
  rotation,
  flip,
  spin,
  pulse,
  marginLeft,
  marginRight,
  ...props
}) => {
  const iconType = getType(icon);

  let name = '';
  let ariaLabel = '';
  if (iconType === 'string') {
    name = icon;
    ariaLabel = 'icon: ' + icon;
  } else if (iconType === 'array') {
    name = icon.join('-');
    ariaLabel = 'icon: ' + icon[1];
  } else if (iconType === 'object') {
    if (isString(icon.name)) {
      name = icon.name;
      ariaLabel = 'icon: ' + icon.name;
    } else if (isArray(icon.name)) {
      icon.name.join('-');
      ariaLabel = 'icon: ' + icon.name[1];
    }
  }

  props['aria-label'] = ariaLabel;

  const iconData =
    iconType === 'object'
      ? {
          type: 'inline',
          viewBox: icon.viewBox,
          path: icon.path,
          tag: icon.tag,
          title: icon.title || ''
        }
      : getIcon(name);
  if (!iconData) return null;

  const isPath = !!iconData.path;

  const baseName = `uc-svg-i-${iconData.type}`;

  const immutableStyle = useMemo(() => {
    return {
      display: 'inline-block',
      overflow: 'visible',
      height: '1em',
      fontSize: 'inherit',
      verticalAlign: '-.125em'
    };
  }, []);

  let mutableStyle = {};

  if (marginLeft)
    mutableStyle.marginLeft = isString(marginLeft) ? marginLeft : '0.5em';
  if (marginRight)
    mutableStyle.marginRight = isString(marginRight) ? marginRight : '0.5em';

  if (size) mutableStyle.fontSize = getFontSize(size);

  if (typeof currentColor === 'undefined') {
    currentColor = isPath && true;
  }
  if (currentColor) props.fill = 'currentColor';

  const height = border ? 1.5 : 1;
  const widthRatioAtFixed = 1.25;
  const precision = 3;

  if (fixedWidth && !border) {
    mutableStyle.width =
      typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
        ? fixedWidth
        : `${roundNumber(height * widthRatioAtFixed, precision)}em`;
  } else {
    mutableStyle.width = `${roundNumber(height * iconData.ratio, precision)}em`;
  }

  if (border) {
    const borderIsObject = isObject(border);
    if (borderIsObject) {
      mutableStyle = { ...mutableStyle, ...border };
    } else {
      mutableStyle = {
        ...mutableStyle,
        height: `${height}em`,
        border: 'solid 0.08em #eee',
        borderRadius: '0.1em',
        padding: '0.2em 0.25em 0.15em'
      };
    }
    if (fixedWidth) {
      mutableStyle.width =
        typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
          ? fixedWidth
          : `${roundNumber(height * widthRatioAtFixed, precision)}em`;
    } else {
      mutableStyle.width = `${roundNumber(
        height * iconData.ratio,
        precision
      )}em`;
    }
  }

  if (pull === 'left') {
    mutableStyle = {
      ...mutableStyle,
      marginRight: '0.3em',
      float: 'left'
    };
  } else if (pull === 'right') {
    mutableStyle = {
      ...mutableStyle,
      marginLeft: '0.3em',
      float: 'right'
    };
  }

  if (rotation || flip) {
    const transformList = [];

    if (rotation) {
      const rotate = `rotate(${rotation}deg)`;
      transformList.push(rotate);
    }
    if (flip) {
      let scale;
      flip === 'horizontal' && (scale = `scale(-1, 1)`);
      flip === 'vertical' && (scale = `scale(1, -1)`);
      flip === 'both' && (scale = `scale(-1, -1)`);
      transformList.push(scale);
    }

    mutableStyle['transform'] = transformList.join(' ');
  }

  if (spin || pulse) {
    const rotateAnimation = keyframes({
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    });
    spin
      ? (mutableStyle.animation = `${rotateAnimation} ${
          isString(spin) ? spin : '1s infinite linear'
        }`)
      : (mutableStyle.animation = `${rotateAnimation} ${
          isString(pulse) ? pulse : '1s infinite steps(8)'
        }`);
  }

  if (use) {
    classNames.push(`${baseName}-use-${name}`);
    props = {
      ...props,
      use: true,
      xlinkHref: `#${baseName}-symbol-${name}`
    };
  } else {
    props = {
      ...props,
      viewBox: iconData.viewBox,
      path: iconData.path,
      tag: iconData.tag
    };
    if (symbol) {
      classNames.push(`${baseName}-symbol-${name}`);
      ids.push(`${baseName}-symbol-${name}`);
      props = {
        ...props,
        symbol: true
      };
    } else {
      classNames.push(`${baseName}-${name}`);
    }
  }

  props.classNames = classNames;
  if (ids.length !== 0) props.ids = ids;

  props.role = role;

  props.style = { ...immutableStyle, ...mutableStyle, ...propStyle };

  return <SVG {...props} />;
};

export default Icon;
