import React from 'react';
import $ from './_constants';
import { getFontSize, keyframes, useLateUpdate } from 'scripts';
import { BaseElement } from '..';
import scripts from './_scripts';

const $styles = $.styles;

type Type =
  | 'normal-outline'
  | 'dark'
  | 'dark-outline'
  | 'outline'
  | 'fill'
  | 'normal';

type Between = boolean | string;

declare global {
  namespace $Type {
    namespace Components {
      type ButtonType = Type;
      type ButtonBetween = Between;
    }
  }
}

type Props = $Type.ReactUtils.CreateProps<
  {
    color?: string;
    type?: Type;
    toFill?: boolean;
    loading?: boolean;
    disable?: boolean;
    effectColor?: string;
    between?: Between;
    shape?: $Type.Constants.Shape;
    size?: $Type.Utils.FontSize;
    fullWidth?: boolean;
    fullHeight?: boolean;
    borderStyle?: string;
    borderWidth?: string;
    clickEffect?: boolean;
    onClick?: () => void;
  },
  typeof BaseElement
>;

const Button: React.FC<Props> = ({
  children,
  color: keyColor,
  type = 'normal',
  toFill = false,
  loading = false,
  disable = false,
  effectColor,
  between = false,
  shape = 'default',
  size,
  fullWidth = false,
  fullHeight = false,
  borderStyle,
  borderWidth = $styles.borderWidth,
  clickEffect = true,
  onClick,
  ...other
}) => {
  const [lateUpdateStatus, lateUpdate] = useLateUpdate(
    $styles.clickEffectDuration
  );

  const hasClickEffect = clickEffect && !disable && !loading;

  const handleClick = React.useCallback(() => {
    onClick && onClick();
    hasClickEffect && lateUpdate();
  }, [onClick, hasClickEffect]);

  const mainStyle = $styles.main;

  const clickEffectStyle = React.useMemo(() => {
    const waveKeyframes = keyframes(scripts.genWaveKeyframes(borderWidth));
    const fadeKeyframes = keyframes({
      to: {
        ...$styles.fadeKeyframes,
      },
    });
    const style = scripts.genClickEffectStyle(
      borderWidth,
      effectColor,
      waveKeyframes,
      fadeKeyframes
    );
    return style;
  }, [borderWidth, effectColor]);

  const loadingMaskStyle = React.useMemo(() => {
    return loading ? scripts.genLoadingMask(borderWidth) : {};
  }, [loading, borderWidth]);

  const shapeStyle = React.useMemo(() => {
    const style = {
      ...scripts.genShape(shape),
      ...(loading ? $styles.loading : {}),
      ...(fullWidth ? $styles.fullWidth : {}),
      ...(fullHeight ? $styles.fullHeight : {}),
      fontSize: size ? getFontSize(size) : $styles.fontSize,
      borderStyle: borderStyle || $styles.borderStyle,
      borderWidth: borderWidth || $styles.borderWidth,
    };
    return style;
  }, [shape, size, borderStyle, borderWidth, fullWidth, fullHeight, loading]);

  const colorStyle = React.useMemo(() => {
    return scripts.genColor(type, toFill, disable, keyColor);
  }, [keyColor, type, toFill, disable]);

  const style = React.useMemo(() => {
    return {
      ...mainStyle,
      ...shapeStyle,
      ...colorStyle,
    };
  }, [shapeStyle, colorStyle]);

  let contents = React.useMemo(() => {
    return scripts.defineContents(children, between, loading);
  }, [children, between, loading]);

  // const clickEffectComponent = React.useMemo(() => {
  //   return (
  //     lateUpdateStatus &&
  //     hasClickEffect && (
  //       <BaseElement
  //         elementName="div"
  //         key={lateUpdateStatus}
  //         aria-hidden={true}
  //         style={clickEffectStyle}
  //       />
  //     )
  //   );
  // }, [lateUpdateStatus, hasClickEffect]);

  // const loadingMaskComponent = React.useMemo(() => {
  //   return (
  //     loading && (
  //       <BaseElement
  //         elementName="div"
  //         aria-hidden={true}
  //         style={loadingMaskStyle}
  //       />
  //     )
  //   );
  // }, [loading]);

  const arias = React.useMemo(() => {
    const props = {} as React.AriaAttributes;
    if (disable) props['aria-disabled'] = true;
    if (loading) props['aria-busy'] = true;
    return props;
  }, [disable, loading]);

  return (
    <BaseElement
      elementName="button"
      _style_={style}
      onClick={handleClick}
      disabled={disable || loading}
      _arias_={arias}
      {...other}
    >
      {contents}
      {/* {loadingMaskComponent}
      {clickEffectComponent} */}
    </BaseElement>
  );
};

export default Button;
