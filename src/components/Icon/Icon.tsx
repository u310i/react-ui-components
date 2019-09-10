import * as React from 'react';
import $ from './_constants';
import {
  roundNumber,
  testCssNumberRegExp,
  getFontSize,
  keyframes,
} from 'scripts';
import iconMap from 'icons';
import { SVG } from '..';

const $styles = $.styles;

const getRatio = (viewBox: $Type.Icon.ViewBox): number | null => {
  if (!viewBox) return null;
  const w = viewBox[2];
  const h = viewBox[3];
  if (!w || !h) null;
  return roundNumber(w / h, 3);
};

type IconData = $Type.Icon.IconDefinition & { ratio: number };

const getIcon = (name: string | null): IconData | null => {
  if (!name) return null;
  const icon = iconMap.get(name);

  if (!icon) return null;
  if (!icon.path && !icon.tag) return null;

  const ratio = getRatio(icon.viewBox);
  if (!ratio) return null;
  return {
    ...icon,
    ratio: ratio,
  };
};

type Icon = string | string[] | $Type.Icon.BaseIconDefinition;

type Props = $Type.ReactUtils.CreateProps<
  {
    icon: Icon;
    role?: string;
    symbol?: boolean;
    use?: boolean;
    currentColor?: string;
    size?: $Type.Utils.FontSize;
    fixedWidth?: string | boolean;
    pull?: 'left' | 'right';
    border?: boolean;
    rotation?: number;
    flip?: 'horizontal' | 'vertical' | 'both';
    spin?: string | boolean;
    pulse?: string | boolean;
    marginLeft?: string | boolean;
    marginRight?: string | boolean;
  },
  $Type.Components.BaseElementSVGProps
>;

const Icon: React.FC<Props> = ({
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
  if (!icon) return null;

  const { style: propStyle, ...propProps } = other;

  const [iconData, props] = React.useMemo(() => {
    let iconData: IconData | null;
    let name: string;
    if (typeof icon === 'string' || Array.isArray(icon)) {
      if (typeof icon === 'string') {
        name = icon;
      } else {
        name = icon.join('-');
      }

      iconData = getIcon(name);
    } else if (typeof icon.name === 'string' && Array.isArray(icon.name)) {
      if (typeof icon.name === 'string') {
        name = icon.name;
      } else {
        name = icon.name.join('-');
      }

      if (icon.viewBox && (icon.path || icon.tag)) {
        const ratio = getRatio(icon.viewBox);
        iconData = ratio
          ? {
              type: 'inline',
              viewBox: icon.viewBox,
              path: icon.path,
              tag: icon.tag,
              ratio: ratio,
            }
          : null;
      } else {
        iconData = getIcon(name);
      }
    } else {
      name = '';
      iconData = null;
    }

    if (!iconData) return [null, null];

    const existPath = !!iconData.path;

    const baseName = `uc-svg-i-${iconData.type}`;

    let fill: string | undefined,
      className: string,
      id: string | undefined,
      use: boolean | undefined,
      symbol: boolean | undefined,
      xlinkHref: string | undefined,
      viewBox: $Type.Icon.ViewBox | undefined,
      path: $Type.Icon.Path | undefined,
      tag: string | undefined;

    if (currentColor || existPath) fill = $styles.currentColor;

    if (use) {
      className = `${baseName}-use-${name}`;
      use = true;
      xlinkHref = `#${baseName}-symbol-${name}`;
    } else {
      viewBox = iconData.viewBox;
      path = iconData.path;
      tag = iconData.tag;
      if (symbol) {
        symbol = true;
        className = `${baseName}-symbol-${name}`;
        id = `${baseName}-symbol-${name}`;
      } else {
        className = `${baseName}-${name}`;
      }
    }

    const props: $Type.Components.SVGProps = {
      ...propProps,
      fill: propProps.fill || fill,
      classNames: [...(propProps.classNames || []), className],
      ids: [...(propProps.ids || []), ...(id ? [id] : [])],
      use,
      symbol,
      xlinkHref,
      viewBox,
      path,
      tag,
    };

    return [iconData as IconData, props];
  }, [icon, use, symbol]);

  if (!iconData) return null;

  const componentStyle = React.useMemo(() => {
    let style: React.CSSProperties = {};

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

    return {
      ...$styles.style,
      ...style,
    };
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

  const style = React.useMemo(() => {
    return { ...componentStyle, ...propStyle };
  }, [componentStyle, propStyle]);

  return <SVG role={role} {...props} style={style} />;
};

export default Icon;
