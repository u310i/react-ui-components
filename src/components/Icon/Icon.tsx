import * as React from "react";
import $ from "./_constants";
import {
  roundNumber,
  testCssNumberRegExp,
  getFontSize,
  keyframes,
  isNumber
} from "scripts";
import iconMap from "icons";
import SVG from "../SVG/SVG";

const getRatio = (viewBox: $Type.Icon.ViewBox): number | null => {
  if (!viewBox) return null;
  if (!isNumber(viewBox[2]) || !isNumber(viewBox[3])) return null;
  const w = viewBox[2];
  const h = viewBox[3];
  return roundNumber(w / h, 3);
};

type IconData = { uniqueName: string } & $Type.Icon.IconDefinition & {
    ratio: number;
  };

const getIcon = (prefix: string, name: string): IconData | null => {
  if (!prefix || !name) return null;
  const icon = iconMap[prefix] && iconMap[prefix].get(name);

  if (!icon) return null;
  if (!icon.path && !icon.tag) return null;

  const ratio = getRatio(icon.viewBox);
  if (!ratio) return null;
  return {
    uniqueName: `${prefix}-${name}`,
    ...icon,
    ratio
  };
};

type Icon = [string, string] | $Type.Icon.BaseIconDefinition;

type ComponentProps = {
  icon?: Icon;
  suffix?: string;
  ariaHidden?: boolean;
  symbol?: boolean;
  use?: boolean;
  currentColor?: boolean;
  size?: $Type.Utils.FontSize;
  fixedWidth?: boolean;
  pull?: "left" | "right";
  border?: boolean;
  rotation?: number;
  flip?: "horizontal" | "vertical" | "both";
  spin?: string | boolean;
  pulse?: string | boolean;
  marginLeft?: string | boolean;
  marginRight?: string | boolean;
};

type Props = $Type.MergeObject<
  ComponentProps,
  $Type.Components.BaseElement._SVGProps
>;

declare global {
  namespace $Type {
    namespace Components {
      namespace Icon {
        type _Props = Props;
        type _ComponentProps = ComponentProps;
      }
    }
  }
}

const Icon: React.FC<Props> = ({
  icon = $.styles.defaultIcon as [string, string],
  suffix,
  ariaHidden = true,
  symbol: propSymbol,
  use: propUse,
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

  const iconData: IconData | null = React.useMemo(() => {
    let data: any = null;

    if (Array.isArray(icon)) {
      if (typeof icon[0] === "string" && typeof icon[1] === "string") {
        data = getIcon(icon[0], icon[1]);
      }
    } else {
      const ratio = getRatio(icon.viewBox);
      data = {
        uniqueName: icon.name && `inline-${icon.name}`,
        viewBox: icon.viewBox,
        path: icon.path,
        tag: icon.tag,
        ratio: ratio
      };
    }

    if (data !== null) {
      const existName = data.uniqueName && typeof data.uniqueName === "string";
      const existPath =
        data.path &&
        (typeof data.path === "string" ||
          (typeof data.path[0] === "string" &&
            typeof data.path[1] === "string"));
      const existTag = data.tag && typeof data.tag === "string";

      if (!(existName && data.ratio && (existPath || existTag))) {
        data = null;
      }
    }

    return data;
  }, [icon]);

  if (!iconData) return null;

  const props: $Type.Components.SVG._Props = React.useMemo(() => {
    const baseName = `${$.styles.prefix}svg-i`;
    const name =
      suffix && typeof suffix === "string"
        ? `${iconData.uniqueName}-${suffix}`
        : iconData.uniqueName;

    let fill: string | undefined,
      className: string,
      use: boolean | undefined,
      symbolId: string | undefined,
      symbol: boolean | undefined,
      useHref: string | undefined,
      viewBox: $Type.Icon.ViewBox | undefined,
      path: $Type.Icon.Path | undefined,
      tag: string | undefined;

    if (currentColor) fill = $.styles.currentColor;

    if (propUse) {
      className = `${baseName}-use-${name}`;
      use = true;
      useHref = `#${baseName}-symbol-${name}`;
    } else {
      viewBox = iconData.viewBox;
      path = iconData.path;
      tag = iconData.tag;
      if (propSymbol) {
        symbol = true;
        className = `${baseName}-symbol-${name}`;
        symbolId = `${baseName}-symbol-${name}`;
      } else {
        className = `${baseName}-${name}`;
      }
    }

    return {
      ...other,
      fill: other.fill || fill,
      classNames: [...(other.classNames || []), className],
      arias: {
        "aria-hidden": ariaHidden,
        ...other.arias
      },
      use,
      symbol,
      symbolId,
      useHref,
      viewBox,
      path,
      tag
    };
  }, [
    iconData,
    name,
    propUse,
    propSymbol,
    ariaHidden,
    other.fill,
    other.classNames,
    other.ids,
    other.arias
  ]);

  if (!iconData) return null;

  const style = React.useMemo(() => {
    let style: React.CSSProperties = {};

    if (propSymbol) style.display = $.styles.symbolDisplay;

    if (marginLeft)
      style.marginLeft =
        typeof marginLeft === "string" ? marginLeft : $.styles.marginLeft;
    if (marginRight)
      style.marginRight =
        typeof marginRight === "string" ? marginRight : $.styles.marginRight;

    if (size) style.fontSize = getFontSize(size);

    const height = border ? $.styles.heightIfBorder : $.styles.height;
    const widthRatioIfFixed = $.styles.widthRatioIfFixed;
    const precision = $.styles.precision;

    if (border) {
      style = {
        ...style,
        height: `${height}em`,
        ...$.styles.border
      };
    }

    if (fixedWidth) {
      style.width = `${roundNumber(height * widthRatioIfFixed, precision)}em`;
    } else {
      style.width = `${roundNumber(height * iconData.ratio, precision)}em`;
    }

    if (pull === "left") {
      style = {
        ...style,
        ...$.styles.pullLeft
      };
    } else if (pull === "right") {
      style = {
        ...style,
        ...$.styles.pullRight
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
        flip === "horizontal" && (scale = $.styles.flipHorizontal);
        flip === "vertical" && (scale = $.styles.flipVertical);
        flip === "both" && (scale = $.styles.flipBoth);
        transformList.push(scale);
      }

      style["transform"] = transformList.join(" ");
    }

    if (spin || pulse) {
      const rotateAnimation = keyframes({
        from: $.styles.roll.from,
        to: $.styles.roll.to
      });
      spin
        ? (style.animation = `${rotateAnimation} ${
            typeof spin === "string" ? spin : $.styles.roll.spin
          }`)
        : (style.animation = `${rotateAnimation} ${
            typeof pulse === "string" ? pulse : $.styles.roll.pulse
          }`);
    }

    return { ...$.styles.style, ...style, ...other.style };
  }, [
    iconData,
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
    other.style
  ]);

  return <SVG {...props} style={style} />;
};

export default Icon;
