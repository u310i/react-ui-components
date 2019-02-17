import React, { useCallback, useMemo } from 'react';
import {
  getFontSize,
  deepMergeOverrideArray,
  keyframes,
  useTimerWithToggle
} from 'utilities';

import { ButtonElement, DivElement } from 'components/_Elements';
import Coordinator from './Coordinator';
import Group from './Group';
import defineContents from './defineContents';
import createColorVariation from './createColorVariation';

const Button = ({
  children,
  style: propStyle,
  nestedStyle: propNestedStyle = {},
  color: mainColor = '#1890ff',
  type = 'normal',
  toFill,
  loading,
  disable,
  effectColor,
  between = true,
  shape,
  size,
  fullWidth,
  fullHeight,
  borderStyle = 'solid',
  borderWidth = '1px',
  clickEffect = true,
  onClick: propOnClick,
  ...props
}) => {
  const [toggleState, setToggleState] = useTimerWithToggle(2000);

  const hasClickEffect = clickEffect && !disable && !loading;

  const onClick = useCallback(() => {
    propOnClick && propOnClick();
    hasClickEffect && setToggleState();
  }, [propOnClick, hasClickEffect]);

  const solidStyle = useMemo(() => {
    return {
      display: 'inline-flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      verticalAlign: 'middle',
      height: '2em',
      padding: '0 1em',
      borderRadius: '0.25em',
      touchAction: 'manipulation',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      transition: 'all .3s cubic-bezier(0.645, 0.045, 0.355, 1)'
    };
  }, []);

  const [clickAnimationStyle, loadingMaskStyle] = useMemo(() => {
    const waveAnimation = keyframes({
      to: {
        top: ['-6px', `calc(-${borderWidth} - 5px)`],
        left: ['-6px', `calc(-${borderWidth} - 5px)`],
        bottom: ['-6px', `calc(-${borderWidth} - 5px)`],
        right: ['-6px', `calc(-${borderWidth} - 5px)`],
        borderWidth: ['6px', `calc(${borderWidth} + 5px)`]
      }
    });
    const fadeAnimation = keyframes({
      to: {
        opacity: 0
      }
    });
    const clickAnimationStyle = {
      position: 'absolute',
      top: `-${borderWidth}`,
      bottom: `-${borderWidth}`,
      left: `-${borderWidth}`,
      right: `-${borderWidth}`,
      borderRadius: 'inherit',
      borderWidth: '0px',
      borderStyle: 'solid',
      borderColor: effectColor || mainColor,
      opacity: '.25',
      animation: `${fadeAnimation} 2s cubic-bezier(.08, .82, .17, 1), ${waveAnimation} .4s cubic-bezier(.08, .82, .17, 1)`,
      animationFillMode: 'forwards',
      display: 'block',
      pointerEvents: 'none',
      zIndex: '100'
    };
    const loadingMaskStyle = loading
      ? {
          position: 'absolute',
          top: `-${borderWidth}`,
          bottom: `-${borderWidth}`,
          left: `-${borderWidth}`,
          right: `-${borderWidth}`,
          pointerEvents: 'none',
          backgroundColor: '#fff',
          borderRadius: 'inherit',
          opacity: '.35',
          transition: 'opacity .2s',
          zIndex: '100'
        }
      : {};
    return [clickAnimationStyle, loadingMaskStyle];
  }, [borderWidth, mainColor, effectColor, loading]);

  // changeShapeStyle
  const shapeStyle = useMemo(() => {
    const style = {};
    if (shape) {
      if (shape === 'round') {
        style.padding = '0 1.25em';
        style.borderRadius = '1em';
      }
      if (shape === 'circle') {
        style.width = '2em';
        style.padding = '0';
        style.borderRadius = '50%';
      }
      if (shape === 'corner') {
        style.padding = '0 1.25em';
        style.borderRadius = '0';
      }
    }
    if (size) style.fontSize = getFontSize(size);
    style.borderStyle = borderStyle;
    style.borderWidth = borderWidth;
    if (fullWidth) style.width = '100%';
    if (fullHeight) style.height = '100%';
    if (loading) style.pointerEvents = 'none';
    return style;
  }, [shape, size, borderStyle, borderWidth, fullWidth, fullHeight, loading]);

  // changeColorStyle
  const [colorStyle, nestedColorStyle] = useMemo(() => {
    return createColorVariation(mainColor, type, toFill, disable);
  }, [mainColor, type, toFill, disable]);

  const style = useMemo(() => {
    return {
      ...solidStyle,
      ...shapeStyle,
      ...colorStyle,
      ...deepMergeOverrideArray(nestedColorStyle, propNestedStyle),
      ...propStyle
    };
  }, [
    solidStyle,
    shapeStyle,
    colorStyle,
    nestedColorStyle,
    propNestedStyle,
    propStyle
  ]);

  let contents = useMemo(() => {
    return defineContents(children, between, loading);
  }, [children, between, loading]);

  const clickEffectComponent = useMemo(() => {
    return (
      toggleState !== undefined &&
      hasClickEffect && (
        <DivElement key={toggleState} noRole style={clickAnimationStyle} />
      )
    );
  }, [toggleState, hasClickEffect]);

  const loadingMaskComponent = useMemo(() => {
    return loading && <DivElement noRole style={loadingMaskStyle} />;
  }, [loading]);

  return (
    <ButtonElement style={style} onClick={onClick} {...props}>
      {contents}
      {loadingMaskComponent}
      {clickEffectComponent}
    </ButtonElement>
  );
};

Button.Group = Group;
Button.Coordinator = Coordinator;

export default Button;
