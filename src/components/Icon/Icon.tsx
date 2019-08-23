import * as React from 'react';
import $ from './_constants';
import {
  roundNumber,
  testCssNumberRegExp,
  getFontSize,
  keyframes,
} from 'scripts';
import iconList from 'src/icons';
import { SVG } from '..';

const $styles = $.styles;
const $names = $.names;

const getIcon = name => {
  const icon = iconList.get(name);
  if (!icon) return null;
  const w = icon.viewBox[2];
  const h = icon.viewBox[3];
  const ratio = roundNumber(w / h, 3);
  return {
    ...icon,
    ratio: ratio,
  };
};

const getName = icon => {
  let name = '';

  if (typeof icon === 'string') {
    name = icon;
  } else if (Array.isArray(icon)) {
    name = icon.join('-');
  } else if (typeof icon.name) {
    if (typeof icon.name === 'string') {
      name = icon.name;
    } else if (Array.isArray(icon.name)) {
      icon.name.join('-');
    }
  }
  return name;
};

const Icon: React.FC = ({
  icon,
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
  ...other
}) => {
  const [iconData, others] = React.useMemo(() => {
    if (!icon) return [null, null];

    const name = getName(icon);

    const iconData =
      icon.viewBox && icon.path && icon.tag
        ? {
            type: 'inline',
            viewBox: icon.viewBox,
            path: icon.path,
            tag: icon.tag,
            title: icon.title || '',
          }
        : getIcon(name);

    const isPath = !!iconData.path;

    const baseName = `uc-svg-i-${iconData.type}`;

    let others = {};

    if (currentColor || isPath) others.fill = $styles.currentColor;

    if (use) {
      others = {
        ...others,
        _className_: `${baseName}-use-${name}`,
        use: true,
        xlinkHref: `#${baseName}-symbol-${name}`,
      };
    } else {
      others = {
        ...others,
        viewBox: iconData.viewBox,
        path: iconData.path,
        tag: iconData.tag,
      };
      if (symbol) {
        others = {
          ...others,
          symbol: true,
          _className_: `${baseName}-symbol-${name}`,
          _id_: `${baseName}-symbol-${name}`,
        };
      } else {
        others = {
          ...others,
          _className_: `${baseName}-${name}`,
        };
      }
    }

    return [iconData, others];
  }, [icon, use, symbol]);

  if (!iconData) return null;

  const _style_ = React.useMemo(() => {
    let style = {};

    if (marginLeft)
      style.marginLeft =
        typeof marginLeft === 'string' ? marginLeft : $styles.marginLeft;
    if (marginRight)
      style.marginRight =
        typeof marginRight === 'string' ? marginRight : $styles.marginRight;

    if (size) style.fontSize = getFontSize(size);

    const height = border ? $styles.heightOnBorder : $styles.height;
    const widthRatioOnFixed = $styles.widthRatioOnFixed;
    const precision = $styles.precision;

    if (fixedWidth && !border) {
      style.width =
        typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
          ? fixedWidth
          : `${roundNumber(height * widthRatioOnFixed, precision)}em`;
    } else {
      style.width = `${roundNumber(height * iconData.ratio, precision)}em`;
    }

    if (border) {
      style = {
        ...style,
        height: `${height}em`,
        ...$styles.border,
      };
      if (fixedWidth) {
        style.width =
          typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
            ? fixedWidth
            : `${roundNumber(height * widthRatioOnFixed, precision)}em`;
      } else {
        style.width = `${roundNumber(height * iconData.ratio, precision)}em`;
      }
    }

    if (pull === 'left') {
      style = {
        ...style,
        ...$styles.pullLeft,
      };
    } else if (pull === 'right') {
      style = {
        ...style,
        ...$styles.pullRight,
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

      style['transform'] = transformList.join(' ');
    }

    if (spin || pulse) {
      const rotateAnimation = keyframes({
        from: $styles.roll.from,
        to: $styles.roll.to,
      });
      spin
        ? (style.animation = `${rotateAnimation} ${
            typeof spin === 'string' ? spin : $styles.roll.spin
          }`)
        : (style.animation = `${rotateAnimation} ${
            typeof pulse === 'string' ? pulse : $styles.roll.pulse
          }`);
    }

    return { ...$styles.style, ...style };
  }, [
    icon,
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
  ]);

  return <SVG _style_={_style_} role={role} {...others} {...other} />;
};

export default Icon;
