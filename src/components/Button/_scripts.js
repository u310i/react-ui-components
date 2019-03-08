import { getComponentMaterials, adustBrightnessFromCssRgb } from 'scripts';
import defineContents from './_defineContents';

const materials = getComponentMaterials('button');

const mOrigin = materials.origin;
const mStyles = materials.styles;
const mColors = mStyles.colors;
const mOSelectors = mOrigin.selectors;

export default {
  defineContents: defineContents,
  genWaveKeyframes: borderWidth => {
    const waveKeyframes = mStyles.waveKeyframes;

    const position = `calc(-${borderWidth} - ${waveKeyframes.effectRange})`;
    const positionFallback = `-${waveKeyframes.effectRangeFallback}`;
    return {
      to: {
        top: [positionFallback, position],
        left: [positionFallback, position],
        bottom: [positionFallback, position],
        right: [positionFallback, position],
        borderWidth: [
          `${waveKeyframes.effectRangeFallback}`,
          `calc(${borderWidth} + ${waveKeyframes.effectRange})`
        ]
      }
    };
  },
  genClickEffectStyle: (
    borderWidth = mStyles.borderWidth,
    effectColor = mOrigin.colors.main,
    waveKeyframes,
    fadeKeyframes
  ) => {
    const commonPosition = `-${borderWidth}`;
    return {
      top: commonPosition,
      bottom: commonPosition,
      left: commonPosition,
      right: commonPosition,
      borderColor: effectColor,
      animation: `${waveKeyframes} ${mStyles.waveDuration} ${
        mOrigin.cubicBeziers.easeOutCirc
      }, ${fadeKeyframes} ${mStyles.fadeDuration} ${
        mOrigin.cubicBeziers.easeOutCirc
      }`,
      ...mStyles.clickEffect
    };
  },
  genLoadingMask: borderWidth => {
    const commonPosition = `-${borderWidth}`;
    return {
      top: commonPosition,
      bottom: commonPosition,
      left: commonPosition,
      right: commonPosition,
      ...mStyles.loadingMask
    };
  },
  genShape: shape => {
    switch (shape) {
      case 'round':
        return mStyles.shape.round;
      case 'circle':
        return mStyles.shape.circle;
      case 'corner':
        return mStyles.shape.corner;
      default:
        return mStyles.shape.default;
    }
  },
  genColor: (type, toFill, disable, keyColor) => {
    keyColor = keyColor || mOrigin.colors.main;
    const activeColor = adustBrightnessFromCssRgb(keyColor, -35);
    const hoverColor = adustBrightnessFromCssRgb(keyColor, 25);

    let style = {};

    switch (type) {
      case 'normal-outline':
        style = {
          color: mOrigin.colors.white,
          backgroundColor: mOrigin.colors.transparent,
          borderColor: mOrigin.colors.white,
          [mOSelectors.hover_focus]: {
            color: keyColor,
            backgroundColor: null,
            borderColor: keyColor
          },
          [mOSelectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
        break;
      case 'dark':
        style = {
          color: mOrigin.colors.white,
          backgroundColor: mColors.darkColor,
          borderColor: mColors.darkColor,
          [mOSelectors.hover_focus]: {
            color: null,
            backgroundColor: keyColor,
            borderColor: keyColor
          },
          [mOSelectors.active]: {
            color: null,
            backgroundColor: activeColor,
            borderColor: activeColor
          }
        };
        break;
      case 'dark-outline':
        style = {
          color: mColors.darkColor,
          backgroundColor: mOrigin.colors.transparent,
          borderColor: mColors.darkColor,
          [mOSelectors.hover_focus]: {
            color: keyColor,
            backgroundColor: null,
            borderColor: keyColor
          },
          [mOSelectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
        break;
      case 'outline':
        style = {
          color: keyColor,
          backgroundColor: mOrigin.colors.transparent,
          borderColor: keyColor,
          [mOSelectors.hover_focus]: {
            color: hoverColor,
            backgroundColor: null,
            borderColor: hoverColor
          },
          [mOSelectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
        break;
      case 'fill':
        style = {
          color: mOrigin.colors.white,
          backgroundColor: keyColor,
          borderColor: keyColor,
          [mOSelectors.hover_focus]: {
            color: null,
            backgroundColor: hoverColor,
            borderColor: hoverColor
          },
          [mOSelectors.active]: {
            color: null,
            backgroundColor: activeColor,
            borderColor: activeColor
          }
        };
        break;
      case 'normal':
      default:
        style = {
          color: mColors.normalTextColor,
          backgroundColor: mOrigin.colors.white,
          borderColor: mColors.normalBorderColor,
          [mOSelectors.hover_focus]: {
            color: keyColor,
            backgroundColor: null,
            borderColor: keyColor
          },
          [mOSelectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
    }

    if (!disable) {
      if (toFill) {
        const toFillStyle = {
          [mOSelectors.hover_focus]: {
            color: mOrigin.colors.white,
            backgroundColor: hoverColor,
            borderColor: hoverColor
          },
          [mOSelectors.active]: {
            color: mOrigin.colors.white,
            backgroundColor: activeColor,
            borderColor: activeColor
          }
        };
        style = {
          ...style,
          ...toFillStyle
        };
      }
    }

    if (disable) {
      if (
        type === 'outline' ||
        type === 'normal-outline' ||
        type === 'dark-outline'
      ) {
        const outlineDisableStyle = {
          color: mColors.disableTextColor,
          backgroundColor: mOrigin.colors.transparent,
          borderColor: mColors.disableTextColor,
          boxShadow: 'none',
          cursor: 'not-allowed'
        };
        style = outlineDisableStyle;
      } else {
        const disableStyle = {
          color: mColors.disableTextColor,
          backgroundColor: mColors.disableBackgroundColor,
          borderColor: mColors.disableBorderColor,
          boxShadow: 'none',
          cursor: 'not-allowed'
        };
        style = disableStyle;
      }
    }

    return style;
  }
};
