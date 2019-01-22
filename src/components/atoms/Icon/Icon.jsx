import React, { useState, useEffect, useMemo, useRef } from 'react';

import { isObject, addProperties, roundNumber } from 'utilities/utils';
import { testCssNumberRegExp } from 'utilities/regExp';
import { getFontSize, getIcon } from './utils';

import SVG from 'atoms/SVG';

const Icon = ({
  type = 'own',
  icon,
  style: propStyle = {},
  className: propClassName = '',
  id: propId = '',
  symbol = false,
  use = false,
  currentColor,
  size = false,
  fixedWidth = false,
  pull = false,
  border = false,
  rotation = false,
  flip = false,
  spin,
  pulse,
  ...props
}) => {
  const className = [];
  const id = [];
  propClassName && className.push(propClassName);
  propId && id.push(propId);

  const iconIsString = typeof icon === 'string';
  const iconIsArray = Array.isArray(icon);
  const iconIsObject = isObject(icon);

  const name =
    (iconIsString && icon) ||
    (iconIsArray && icon.join('-')) ||
    (iconIsObject
      ? typeof icon.name === 'string' && icon.name
      : Array.isArray(icon.name) && icon.name.join('-'));

  const iconData = iconIsObject
    ? {
        type: 'direct',
        viewBox: icon.viewBox,
        path: icon.path,
        tag: icon.tag
      }
    : getIcon(name);

  const pathExists = !!iconData.path;

  const baseName = `uc-svg-i-${iconData.type}`;

  const componentStyle = useMemo(() => {
    return {
      display: 'inline-block',
      overflow: 'visible',
      height: '1em',
      fontSize: 'inherit',
      verticalAlign: '-.125em'
    };
  });

  size && (componentStyle['fontSize'] = getFontSize(size));

  if (typeof currentColor === 'undefined') {
    currentColor = pathExists && true;
  }
  currentColor && (props['fill'] = 'currentColor');

  const height = border ? 1.5 : 1;

  if (fixedWidth && !border) {
    componentStyle['width'] =
      typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
        ? fixedWidth
        : `${roundNumber(height * 1.25, 3)}em`;
  } else {
    componentStyle['width'] = `${roundNumber(height * iconData.ratio, 3)}em`;
  }

  if (border) {
    const borderIsObject = isObject(border);
    addProperties(componentStyle, [
      ['height', `${height}em`],
      ['border', (borderIsObject && border.border) || 'solid 0.08em #eee'],
      ['borderRadius', (borderIsObject && border.borderRadius) || '0.1em'],
      ['padding', (borderIsObject && border.padding) || '0.2em 0.25em 0.15em']
    ]);
    if (fixedWidth) {
      componentStyle['width'] =
        typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
          ? fixedWidth
          : `${roundNumber(height * 1.25, 3)}em`;
    } else {
      componentStyle['width'] = `${roundNumber(height * iconData.ratio, 3)}em`;
    }
  }

  if (pull === 'left') {
    addProperties(componentStyle, [
      ['marginRight', '0.3em'],
      ['float', 'left']
    ]);
  } else if (pull === 'right') {
    addProperties(componentStyle, [
      ['marginLeft', '0.3em'],
      ['float', 'right']
    ]);
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

    componentStyle['transform'] = transformList.join(' ');
  }

  if (spin || pulse) {
    spin
      ? (componentStyle['animation'] = 'uc-spin 2s infinite linear')
      : (componentStyle['animation'] = 'uc-spin 1s infinite steps(8)');
  }

  if (use) {
    className.push(`${baseName}-use-${name}`);
    addProperties(props, [
      ['use', true],
      ['className', className.join(' ')],
      ['xlinkHref', `#${baseName}-symbol-${name}`]
    ]);
  } else {
    addProperties(props, [
      ['viewBox', iconData.viewBox],
      ['path', iconData.path],
      ['tag', iconData.tag]
    ]);
    if (symbol) {
      className.push(`${baseName}-symbol-${name}`);
      id.push(`${baseName}-symbol-${name}`);
      addProperties(props, [
        ['symbol', true],
        ['className', className.join(' ')],
        ['id', id.join(' ')]
      ]);
    } else {
      className.push(`${baseName}-${name}`);
      props['className'] = className.join(' ');
    }
  }

  props['style'] = { ...componentStyle, ...propStyle };

  return <SVG {...props} />;
};

export default Icon;
