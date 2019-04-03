import $ from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const name = 'button';

const $colors = $.colors;
const $selectors = $.selectors;
const $cubicBeziers = $.cubicBeziers;
const $shape = $.shape;

const materials = {
  colors: {
    main: $colors.main,
    white: $colors.white,
    transparent: $colors.transparent,
    normalTextColor: 'rgb(89, 89, 89)',
    normalBorderColor: 'rgb(217, 217, 217)',
    darkColor: 'rgb(78, 78, 78)',
    disableTextColor: 'rgba(0, 0, 0, 0.25)',
    disableBackgroundColor: 'rgb(245, 245, 245)',
    disableBorderColor: 'rgb(217, 217, 217)'
  },
  selectors: {
    hover_focus: $selectors.hover_focus,
    active: $selectors.active,
    hover_focus: $selectors.hover_focus
  },
  styles: {
    solid: {
      display: 'inline-flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      verticalAlign: 'middle',
      height: '2em',
      touchAction: 'manipulation',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      transition: `all .3s ${$cubicBeziers.easeInOut}`
    },
    clickEffectDuration: 2000,
    clickEffectCubicBeziers: $cubicBeziers.easeOutCirc,
    waveKeyframes: {
      effectRange: '5px',
      effectRangeFallback: '6px'
    },
    waveDuration: '.4s',
    fadeKeyframes: {
      opacity: '0'
    },
    fadeDuration: '2s',
    clickEffect: {
      position: 'absolute',
      borderRadius: 'inherit',
      borderWidth: '0px',
      borderStyle: 'solid',
      opacity: '.25',
      animationFillMode: 'forwards',
      display: 'block',
      pointerEvents: 'none',
      zIndex: '100'
    },
    loadingMask: {
      position: 'absolute',
      pointerEvents: 'none',
      backgroundColor: '#fff',
      borderRadius: 'inherit',
      opacity: '.35',
      transition: 'opacity .2s',
      zIndex: '100'
    },
    shape: {
      round: {
        padding: '0 1.25em',
        borderRadius: $shape.round
      },
      circle: {
        width: '2em',
        padding: '0',
        borderRadius: $shape.circle
      },
      corner: {
        padding: '0 1.25em',
        borderRadius: $shape.corner
      },
      default: {
        padding: '0 1em',
        borderRadius: $shape.default
      }
    },
    fontSize: '1em',
    borderStyle: 'solid',
    borderWidth: '1px',
    fullWidth: {
      width: '100%'
    },
    fullHeight: {
      height: '100%'
    },
    loading: {
      pointerEvents: 'none'
    }
  },
  contents: {
    names: {
      loading: 'loading',
      ucButtonLoading: 'uc-button-loading',
      sysLoading: 'sys-loading',
      ucButtonIcon: 'uc-button-icon',
      ucButtonInner: 'uc-button-inner'
    },
    styles: {
      span: {
        lineHeight: '1.499',
        marginTop: '-.125em'
      },
      between: '0.5em',
      noneBetween: '0px'
    }
  },
  group: {
    names: {
      ucButtonGroup: 'uc-button-group'
    },
    selectors: {
      firstChild: $selectors.firstChild,
      lastChild: $selectors.lastChild,
      notFirstChild: $selectors.notFirstChild,
      notLastChild: $selectors.notLastChild,
      nthChild: $selectors.nthChild,
      notNthChild: $selectors.notNthChild
    },
    styles: {
      firstChild: {
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px'
      },
      lastChild: {
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px'
      },
      notFirstChild: {
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
        [$selectors.hover]: {
          borderLeftStyle: 'solid'
        }
      },
      notLastChild: {
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px'
      },
      between: {
        defaultSpace: '0.2em',
        noneSpace: {
          borderLeftColor: 'rgba(255, 255, 255, 0)'
        }
      }
    }
  }
};

createComponentMaterials(materials, name);

export default getComponentMaterials(name);
