import React, { useState, useEffect, useMemo, useRef } from 'react';
import $ from './_constants';
import {
  roundNumber,
  testCssNumberRegExp,
  getType,
  isString,
  isArray,
  isObject,
  isUndefined,
  getFontSize,
  keyframes
} from 'scripts';
import scripts from './_scripts';
import { SVG } from '..';

const $styles = $.styles;
const $names = $.names;

const Icon = ({
  icon,
  style: propStyle = {},
  classNames = [],
  ids = [],
  role = 'icon',
  ariaLabel: propAriaLabel,
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
  if (iconType === 'string') {
    name = icon;
  } else if (iconType === 'array') {
    name = icon.join('-');
  } else if (iconType === 'object') {
    if (isString(icon.name)) {
      name = icon.name;
    } else if (isArray(icon.name)) {
      icon.name.join('-');
    }
  }

  if (propAriaLabel) props['aria-label'] = propAriaLabel;

  const iconData =
    iconType === 'object'
      ? {
          type: 'inline',
          viewBox: icon.viewBox,
          path: icon.path,
          tag: icon.tag,
          title: icon.title || ''
        }
      : scripts.getIcon(name);
  if (!iconData) return null;

  const isPath = !!iconData.path;

  const baseName = `uc-svg-i-${iconData.type}`;

  const mainStyle = useMemo(() => {
    return $styles.main;
  }, []);

  let mutableStyle = {};

  if (marginLeft)
    mutableStyle.marginLeft = isString(marginLeft)
      ? marginLeft
      : $styles.marginLeft;
  if (marginRight)
    mutableStyle.marginRight = isString(marginRight)
      ? marginRight
      : $styles.marginRight;

  if (size) mutableStyle.fontSize = getFontSize(size);

  if (isUndefined(currentColor)) {
    currentColor = isPath && true;
  }
  if (currentColor) props.fill = $styles.currentColor;

  const height = border ? $styles.heightOnBorder : $styles.height;
  const widthRatioOnFixed = $styles.widthRatioOnFixed;
  const precision = $styles.precision;

  if (fixedWidth && !border) {
    mutableStyle.width =
      typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
        ? fixedWidth
        : `${roundNumber(height * widthRatioOnFixed, precision)}em`;
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
        ...$styles.border
      };
    }
    if (fixedWidth) {
      mutableStyle.width =
        typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
          ? fixedWidth
          : `${roundNumber(height * widthRatioOnFixed, precision)}em`;
    } else {
      mutableStyle.width = `${roundNumber(height * iconData.ratio, precision)}em`;
    }
  }

  if (pull === 'left') {
    mutableStyle = {
      ...mutableStyle,
      ...$styles.pullLeft
    };
  } else if (pull === 'right') {
    mutableStyle = {
      ...mutableStyle,
      ...$styles.pullRight
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
      flip === 'horizontal' && (scale = $styles.flipHorizontal);
      flip === 'vertical' && (scale = $styles.flipVertical);
      flip === 'both' && (scale = $styles.flipBoth);
      transformList.push(scale);
    }

    mutableStyle['transform'] = transformList.join(' ');
  }

  if (spin || pulse) {
    const rotateAnimation = keyframes({
      from: $styles.roll.from,
      to: $styles.roll.to
    });
    spin
      ? (mutableStyle.animation = `${rotateAnimation} ${
          isString(spin) ? spin : $styles.roll.spin
        }`)
      : (mutableStyle.animation = `${rotateAnimation} ${
          isString(pulse) ? pulse : $styles.roll.pulse
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

  props.style = { ...mainStyle, ...mutableStyle, ...propStyle };

  return <SVG {...props} />;
};

export default Icon;
