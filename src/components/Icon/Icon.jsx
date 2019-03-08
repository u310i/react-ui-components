import React, { useState, useEffect, useMemo, useRef } from 'react';
import './_materials';
import {
  getComponentMaterials,
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
import SVG from 'components/SVG';

const materials = getComponentMaterials('icon');
const mStyles = materials.styles;
const mNames = materials.names;

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
  const ariaLabelPrefix = mNames.ariaLabelPrefix;
  if (iconType === 'string') {
    name = icon;
    ariaLabel = ariaLabelPrefix + icon;
  } else if (iconType === 'array') {
    name = icon.join('-');
    ariaLabel = ariaLabelPrefix + icon[1];
  } else if (iconType === 'object') {
    if (isString(icon.name)) {
      name = icon.name;
      ariaLabel = ariaLabelPrefix + icon.name;
    } else if (isArray(icon.name)) {
      icon.name.join('-');
      ariaLabel = ariaLabelPrefix + icon.name[1];
    }
  }

  props[materials.origin.cssProperties.ariaLabel] = ariaLabel;

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

  const solidStyle = useMemo(() => {
    return mStyles.solid;
  }, []);

  let fluidStyle = {};

  if (marginLeft)
    fluidStyle.marginLeft = isString(marginLeft)
      ? marginLeft
      : mStyles.marginLeft;
  if (marginRight)
    fluidStyle.marginRight = isString(marginRight)
      ? marginRight
      : mStyles.marginRight;

  if (size) fluidStyle.fontSize = getFontSize(size);

  if (isUndefined(currentColor)) {
    currentColor = isPath && true;
  }
  if (currentColor) props.fill = mStyles.currentColor;

  const height = border ? mStyles.heightOnBorder : mStyles.height;
  const widthRatioOnFixed = mStyles.widthRatioOnFixed;
  const precision = mStyles.precision;

  if (fixedWidth && !border) {
    fluidStyle.width =
      typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
        ? fixedWidth
        : `${roundNumber(height * widthRatioOnFixed, precision)}em`;
  } else {
    fluidStyle.width = `${roundNumber(height * iconData.ratio, precision)}em`;
  }

  if (border) {
    const borderIsObject = isObject(border);
    if (borderIsObject) {
      fluidStyle = { ...fluidStyle, ...border };
    } else {
      fluidStyle = {
        ...fluidStyle,
        height: `${height}em`,
        ...mStyles.border
      };
    }
    if (fixedWidth) {
      fluidStyle.width =
        typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
          ? fixedWidth
          : `${roundNumber(height * widthRatioOnFixed, precision)}em`;
    } else {
      fluidStyle.width = `${roundNumber(height * iconData.ratio, precision)}em`;
    }
  }

  if (pull === 'left') {
    fluidStyle = {
      ...fluidStyle,
      ...mStyles.pullLeft
    };
  } else if (pull === 'right') {
    fluidStyle = {
      ...fluidStyle,
      ...mStyles.pullRight
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
      flip === 'horizontal' && (scale = mStyles.flipHorizontal);
      flip === 'vertical' && (scale = mStyles.flipVertical);
      flip === 'both' && (scale = mStyles.flipBoth);
      transformList.push(scale);
    }

    fluidStyle['transform'] = transformList.join(' ');
  }

  if (spin || pulse) {
    const rotateAnimation = keyframes({
      from: mStyles.roll.from,
      to: mStyles.roll.to
    });
    spin
      ? (fluidStyle.animation = `${rotateAnimation} ${
          isString(spin) ? spin : mStyles.roll.spin
        }`)
      : (fluidStyle.animation = `${rotateAnimation} ${
          isString(pulse) ? pulse : mStyles.roll.pulse
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

  props.style = { ...solidStyle, ...fluidStyle, ...propStyle };

  return <SVG {...props} />;
};

export default Icon;
