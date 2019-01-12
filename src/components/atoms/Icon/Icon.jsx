import React, { useState, useEffect, useMemo, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userDefinedIconList, fontAwesomeIconMap } from 'src/icons';
import { isObject, toCamelCase, addProperties } from 'utilities/utils';
import { getFontSize } from './utils';

import SVG from 'atoms/SVG';

const Icon = ({
  type = 'own',
  icon,
  style: propStyle = {},
  symbol = false,
  use = false,
  currentColor,
  size = false,
  fixedWidth = false,
  ...props
}) => {
  const iconIsArray = Array.isArray(icon);
  const iconIsObject = isObject(icon);
  const isOwn = type === 'own';
  const isFa = type === 'fa';

  const name =
    (!icon && '') ||
    (iconIsArray && icon.join('-')) ||
    (iconIsObject && icon.prefix && icon.iconName
      ? `${icon.prefix}-${icon.iconName}`
      : '') ||
    (typeof icon === 'string' && icon) ||
    icon.toString();
  const baseName = `uc-svg-i-${type}`;

  const ownIcon = isOwn && userDefinedIconList.get(name);

  const componentStyle = useMemo(() => {
    return {
      display: 'inline-block',
      overflow: 'visible',
      height: '1em',
      fontSize: 'inherit',
      verticalAlign: '-.125em'
    };
  });

  if (typeof currentColor === 'undefined') {
    (isOwn && (currentColor = false)) || (isFa && (currentColor = true));
  }

  if (isOwn || use) {
    currentColor && (props['fill'] = 'currentColor');
    fixedWidth &&
      (propStyle['width'] =
        typeof fixedWidth === 'string' ? fixedWidth : '1.25em');
    size && (propStyle['fontSize'] = getFontSize(size));
    if (!use) {
      addProperties(props, [
        ['viewBox', ownIcon.viewBox],
        ['inner', ownIcon.inner]
      ]);
      if (!symbol) {
        addProperties(props, [
          ['className', `${baseName}-${name}`],
          ['style', { ...componentStyle, ...propStyle }]
        ]);
      } else {
        addProperties(props, [
          ['symbol', symbol],
          ['className', `${baseName}-'symbol-'${name}`],
          ['id', `${baseName}-symbol-${name}`],
          ['style', propStyle]
        ]);
      }
    } else {
      let w, h;
      if (isFa) {
        const faIcon = fontAwesomeIconMap.get(toCamelCase(name, '-'));
        w = faIcon.icon[0];
        h = faIcon.icon[1];
      } else {
        const viewBoxArray = ownIcon.viewBox.split(' ');
        w = viewBoxArray[2];
        h = viewBoxArray[3];
      }
      const width = Math.round((w / h) * 100) / 100;

      addProperties(props, [
        ['use', use],
        ['className', `${baseName}-use-${name}`],
        [
          'style',
          {
            ...componentStyle,
            width: width ? `${width}em` : '1.25em',
            ...propStyle
          }
        ],
        ['xlinkHref', `#${baseName}-symbol-${name}`]
      ]);
    }
  } else if (isFa) {
    props['icon'] = icon;
    typeof fixedWidth === 'string'
      ? (propStyle['width'] = fixedWidth)
      : (props['fixedWidth'] = fixedWidth);
    size && (props['size'] = size);
    props['style'] = propStyle;
    if (!symbol) {
      props['className'] = `${baseName}-${name}`;
    } else {
      addProperties(props, [
        ['className', `${baseName}-symbol-${name}`],
        ['symbol', `${baseName}-symbol-${name}`]
      ]);
    }
  }

  return isOwn || use ? <SVG {...props} /> : <FontAwesomeIcon {...props} />;
};

export default Icon;
