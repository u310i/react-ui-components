import originMaterials from 'components/_materials';
import { createComponentMaterials, adustBrightnessFromCssRgb } from 'scripts';

const { colors, selectors, cubicBeziers } = originMaterials;

const normalTextColor = 'rgb(89, 89, 89)';
const normalBorderColor = 'rgb(217, 217, 217)';
const darkColor = 'rgb(78, 78, 78)';
const disableTextColor = 'rgba(0, 0, 0, 0.25)';
const disableBackgroundColor = 'rgb(245, 245, 245)';
const disableBorderColor = 'rgb(217, 217, 217)';
const activeColor = adustBrightnessFromCssRgb(colors.main, -35);
const hoverColor = adustBrightnessFromCssRgb(colors.main, 25);

const materials = {
  origin: originMaterials,
  styles: {
    types: {
      normal: {
        color: normalTextColor,
        backgroundColor: colors.white,
        borderColor: normalBorderColor,
        [selectors.hover_focus]: {
          color: colors.main,
          backgroundColor: null,
          borderColor: colors.main
        },
        [selectors.active]: {
          color: activeColor,
          backgroundColor: null,
          borderColor: activeColor
        }
      },
      normalOutline: {
        color: colors.white,
        backgroundColor: colors.transparent,
        borderColor: colors.white,
        [selectors.hover_focus]: {
          color: colors.main,
          backgroundColor: null,
          borderColor: colors.main
        },
        [selectors.active]: {
          color: activeColor,
          backgroundColor: null,
          borderColor: activeColor
        }
      },
      dark: {
        color: colors.white,
        backgroundColor: darkColor,
        borderColor: darkColor,
        [selectors.hover_focus]: {
          color: null,
          backgroundColor: colors.main,
          borderColor: colors.main
        },
        [selectors.active]: {
          color: null,
          backgroundColor: activeColor,
          borderColor: activeColor
        }
      },
      darkOutline: {
        color: darkColor,
        backgroundColor: colors.transparent,
        borderColor: darkColor,
        [selectors.hover_focus]: {
          color: colors.main,
          backgroundColor: null,
          borderColor: colors.main
        },
        [selectors.active]: {
          color: activeColor,
          backgroundColor: null,
          borderColor: activeColor
        }
      },
      outline: {
        color: colors.main,
        backgroundColor: colors.transparent,
        borderColor: colors.main,
        [selectors.hover_focus]: {
          color: hoverColor,
          backgroundColor: null,
          borderColor: hoverColor
        },
        [selectors.active]: {
          color: activeColor,
          backgroundColor: null,
          borderColor: activeColor
        }
      },
      fill: {
        color: colors.white,
        backgroundColor: colors.main,
        borderColor: colors.main,
        [selectors.hover_focus]: {
          color: null,
          backgroundColor: hoverColor,
          borderColor: hoverColor
        },
        [selectors.active]: {
          color: null,
          backgroundColor: activeColor,
          borderColor: activeColor
        }
      }
    },
    toFill: {
      [selectors.hover_focus]: {
        color: colors.white,
        backgroundColor: hoverColor,
        borderColor: hoverColor
      },
      [selectors.active]: {
        color: colors.white,
        backgroundColor: activeColor,
        borderColor: activeColor
      }
    },
    disable: {
      color: disableTextColor,
      backgroundColor: disableBackgroundColor,
      borderColor: disableBorderColor,
      boxShadow: 'none',
      cursor: 'not-allowed'
    },
    outlineDisable: {
      color: disableTextColor,
      backgroundColor: colors.transparent,
      borderColor: disableTextColor,
      boxShadow: 'none',
      cursor: 'not-allowed'
    }
  }
};

createComponentMaterials(materials, 'button');
