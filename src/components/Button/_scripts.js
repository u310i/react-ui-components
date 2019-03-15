import { getComponentMaterials, adustBrightnessFromCssRgb } from 'scripts';
import defineContents from './_defineContents';

const $materials = getComponentMaterials('button');

const $styles = $materials.styles;
const $colors = $materials.colors;
const $selectors = $materials.selectors;

export default {
  defineContents: defineContents,
  genWaveKeyframes: borderWidth => {
    const waveKeyframes = $styles.waveKeyframes;

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
    borderWidth = $styles.borderWidth,
    effectColor = $colors.main,
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
      animation: `${waveKeyframes} ${$styles.waveDuration} ${
        $styles.clickEffectCubicBeziers
      }, ${fadeKeyframes} ${$styles.fadeDuration} ${
        $styles.clickEffectCubicBeziers
      }`,
      ...$styles.clickEffect
    };
  },
  genLoadingMask: borderWidth => {
    const commonPosition = `-${borderWidth}`;
    return {
      top: commonPosition,
      bottom: commonPosition,
      left: commonPosition,
      right: commonPosition,
      ...$styles.loadingMask
    };
  },
  genShape: shape => {
    switch (shape) {
      case 'round':
        return $styles.shape.round;
      case 'circle':
        return $styles.shape.circle;
      case 'corner':
        return $styles.shape.corner;
      default:
        return $styles.shape.default;
    }
  },
  genColor: (type, toFill, disable, keyColor) => {
    keyColor = keyColor || $colors.main;
    const activeColor = adustBrightnessFromCssRgb(keyColor, -35);
    const hoverColor = adustBrightnessFromCssRgb(keyColor, 25);

    let style = {};

    switch (type) {
      case 'normal-outline':
        style = {
          color: $colors.white,
          backgroundColor: $colors.transparent,
          borderColor: $colors.white,
          [$selectors.hover_focus]: {
            color: keyColor,
            backgroundColor: null,
            borderColor: keyColor
          },
          [$selectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
        break;
      case 'dark':
        style = {
          color: $colors.white,
          backgroundColor: $colors.darkColor,
          borderColor: $colors.darkColor,
          [$selectors.hover_focus]: {
            color: null,
            backgroundColor: keyColor,
            borderColor: keyColor
          },
          [$selectors.active]: {
            color: null,
            backgroundColor: activeColor,
            borderColor: activeColor
          }
        };
        break;
      case 'dark-outline':
        style = {
          color: $colors.darkColor,
          backgroundColor: $colors.transparent,
          borderColor: $colors.darkColor,
          [$selectors.hover_focus]: {
            color: keyColor,
            backgroundColor: null,
            borderColor: keyColor
          },
          [$selectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
        break;
      case 'outline':
        style = {
          color: keyColor,
          backgroundColor: $colors.transparent,
          borderColor: keyColor,
          [$selectors.hover_focus]: {
            color: hoverColor,
            backgroundColor: null,
            borderColor: hoverColor
          },
          [$selectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
        break;
      case 'fill':
        style = {
          color: $colors.white,
          backgroundColor: keyColor,
          borderColor: keyColor,
          [$selectors.hover_focus]: {
            color: null,
            backgroundColor: hoverColor,
            borderColor: hoverColor
          },
          [$selectors.active]: {
            color: null,
            backgroundColor: activeColor,
            borderColor: activeColor
          }
        };
        break;
      case 'normal':
      default:
        style = {
          color: $colors.normalTextColor,
          backgroundColor: $colors.white,
          borderColor: $colors.normalBorderColor,
          [$selectors.hover_focus]: {
            color: keyColor,
            backgroundColor: null,
            borderColor: keyColor
          },
          [$selectors.active]: {
            color: activeColor,
            backgroundColor: null,
            borderColor: activeColor
          }
        };
    }

    if (!disable) {
      if (toFill) {
        const toFillStyle = {
          [$selectors.hover_focus]: {
            color: $colors.white,
            backgroundColor: hoverColor,
            borderColor: hoverColor
          },
          [$selectors.active]: {
            color: $colors.white,
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
          color: $colors.disableTextColor,
          backgroundColor: $colors.transparent,
          borderColor: $colors.disableTextColor,
          boxShadow: 'none',
          cursor: 'not-allowed'
        };
        style = outlineDisableStyle;
      } else {
        const disableStyle = {
          color: $colors.disableTextColor,
          backgroundColor: $colors.disableBackgroundColor,
          borderColor: $colors.disableBorderColor,
          boxShadow: 'none',
          cursor: 'not-allowed'
        };
        style = disableStyle;
      }
    }

    return style;
  }
};
