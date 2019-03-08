import React, { useCallback, useMemo, useContext } from 'react';
import './_materials';
import {
  getComponentMaterials,
  getFontSize,
  keyframes,
  useTimerWithToggle
} from 'scripts';
import { ButtonElement, DivElement } from 'elements';
import ButtonCoordinator from './ButtonCoordinator';
import ButtonGroup from './ButtonGroup';
import scripts from './_scripts';

const materials = getComponentMaterials('button');
const mStyles = materials.styles;

const Button = ({
  children,
  style: propStyle,
  color: keyColor,
  type,
  toFill,
  loading,
  disable,
  effectColor,
  between,
  shape,
  size,
  fullWidth,
  fullHeight,
  borderStyle,
  borderWidth,
  clickEffect = true,
  onClick: propOnClick,
  ...props
}) => {
  const [toggleState, setToggleState] = useTimerWithToggle(
    mStyles.clickEffectDuration
  );

  const hasClickEffect = clickEffect && !disable && !loading;

  const onClick = useCallback(() => {
    propOnClick && propOnClick();
    hasClickEffect && setToggleState();
  }, [propOnClick, hasClickEffect]);

  const solidStyle = mStyles.solid;

  const clickEffectStyle = useMemo(() => {
    const waveKeyframes = keyframes(scripts.genWaveKeyframes(borderWidth));
    const fadeKeyframes = keyframes({
      to: {
        ...mStyles.fadeKeyframes
      }
    });
    const style = scripts.genClickEffectStyle(
      borderWidth,
      effectColor,
      waveKeyframes,
      fadeKeyframes
    );
    return style;
  }, [borderWidth, effectColor]);

  const loadingMaskStyle = useMemo(() => {
    return loading ? scripts.genLoadingMask(borderWidth) : {};
  }, [loading, borderWidth]);

  const shapeStyle = useMemo(() => {
    const style = {
      ...scripts.genShape(shape),
      ...(loading ? mStyles.loading : {}),
      ...(fullWidth ? mStyles.fullWidth : {}),
      ...(fullHeight ? mStyles.fullHeight : {})
    };
    style.fontSize = size ? getFontSize(size) : mStyles.fontSize;
    style.borderStyle = borderStyle || mStyles.borderStyle;
    style.borderWidth = borderWidth || mStyles.borderWidth;

    return style;
  }, [shape, size, borderStyle, borderWidth, fullWidth, fullHeight, loading]);

  const colorStyle = useMemo(() => {
    return scripts.genColor(type, toFill, disable, keyColor);
  }, [keyColor, type, toFill, disable]);

  const style = useMemo(() => {
    return {
      ...solidStyle,
      ...shapeStyle,
      ...colorStyle,
      ...propStyle
    };
  }, [shapeStyle, colorStyle, propStyle]);

  let contents = useMemo(() => {
    return scripts.defineContents(children, between, loading);
  }, [children, between, loading]);

  const clickEffectComponent = useMemo(() => {
    return (
      toggleState !== undefined &&
      hasClickEffect && (
        <DivElement key={toggleState} noRole style={clickEffectStyle} />
      )
    );
  }, [toggleState, hasClickEffect]);

  const loadingMaskComponent = useMemo(() => {
    return loading && <DivElement noRole style={loadingMaskStyle} />;
  }, [loading]);

  return (
    <ButtonElement
      style={style}
      onClick={onClick}
      disabled={disable || loading}
      {...props}
    >
      {contents}
      {loadingMaskComponent}
      {clickEffectComponent}
    </ButtonElement>
  );
};

Button.Group = ButtonGroup;
Button.Coordinator = ButtonCoordinator;

export default Button;
