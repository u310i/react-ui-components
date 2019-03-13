import { getComponentMaterials, adustBrightnessFromCssRgb } from 'scripts';
import defineContents from './_defineContents';

const materials = getComponentMaterials('button');

const mStyles = materials.styles;
const mColors = materials.colors;
const mSelectors = materials.selectors;

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
    effectColor = mColors.main,
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
        mStyles.clickEffectCubicBeziers
      }, ${fadeKeyframes} ${mStyles.fadeDuration} ${
        mStyles.clickEffectCubicBeziers
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
    keyColor = keyColor || mColors.main;
    const activeColor = adustBrightnessFromCssRgb(keyColor, -35);
    const hoverColor = adustBrightnessFromCssRgb(keyColor, 25);

    let style = {};

    switch (type) {
      case 'normal-outline':
        style = {
          color: mColors.white,
          backgroundColor: mColors.transparent,
          borderColor: mColors.white,
          [mSelectors.hover_focus]: {
            color: keyColor,
            backgroundColor: null,
            borderColor: keyColor
          },
          [mSelectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
        break;
      case 'dark':
        style = {
          color: mColors.white,
          backgroundColor: mColors.darkColor,
          borderColor: mColors.darkColor,
          [mSelectors.hover_focus]: {
            color: null,
            backgroundColor: keyColor,
            borderColor: keyColor
          },
          [mSelectors.active]: {
            color: null,
            backgroundColor: activeColor,
            borderColor: activeColor
          }
        };
        break;
      case 'dark-outline':
        style = {
          color: mColors.darkColor,
          backgroundColor: mColors.transparent,
          borderColor: mColors.darkColor,
          [mSelectors.hover_focus]: {
            color: keyColor,
            backgroundColor: null,
            borderColor: keyColor
          },
          [mSelectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
        break;
      case 'outline':
        style = {
          color: keyColor,
          backgroundColor: mColors.transparent,
          borderColor: keyColor,
          [mSelectors.hover_focus]: {
            color: hoverColor,
            backgroundColor: null,
            borderColor: hoverColor
          },
          [mSelectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
        break;
      case 'fill':
        style = {
          color: mColors.white,
          backgroundColor: keyColor,
          borderColor: keyColor,
          [mSelectors.hover_focus]: {
            color: null,
            backgroundColor: hoverColor,
            borderColor: hoverColor
          },
          [mSelectors.active]: {
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
          backgroundColor: mColors.white,
          borderColor: mColors.normalBorderColor,
          [mSelectors.hover_focus]: {
            color: keyColor,
            backgroundColor: null,
            borderColor: keyColor
          },
          [mSelectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
    }

    if (!disable) {
      if (toFill) {
        const toFillStyle = {
          [mSelectors.hover_focus]: {
            color: mColors.white,
            backgroundColor: hoverColor,
            borderColor: hoverColor
          },
          [mSelectors.active]: {
            color: mColors.white,
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
          backgroundColor: mColors.transparent,
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
