import {
  defaultTheme,
  genTheme,
  resetGlobalStyle,
  createAppMaterials,
  createPageMaterials,
  createComponentMaterials,
  getComponentMaterials
} from './init';

import {
  deepMerge,
  deepMergeOverrideArray,
  genUniqueId,
  createOptimizedEvent,
  extractOverlapObjectProperty,
  toCamelCase,
  fromCamelCase,
  roundNumber
} from './utils';

import {
  keyframes,
  getFontSize,
  genTransitionProperty,
  genReactCSSTransitionStyle,
  genSimpleTransitionStyle,
  assignTransitionDuration
} from './style';

import {
  toFullHexa,
  hexa2rgba,
  hexa2hsla,
  rgba2hsla,
  cssRgb2Array,
  toCssColor,
  LightenDarkenHex,
  adustBrightness,
  adustBrightnessFromCssRgb
} from './color';

import {
  isReact,
  isReactComponent,
  isReactElement,
  isArray,
  isEmptyArray,
  isObject,
  isEmptyObject,
  isNumber,
  isNaN,
  isInteger,
  isEven,
  isOdd,
  isString,
  isEmptyString,
  isBoolean,
  isFunction,
  isDate,
  getType
} from './checkTypes';

import {
  extractCurrentScreenSizeProps,
  useGetInitBreakpoint,
  getComponentByBreakpoint
} from './breakpoint';

import { testCssNumberRegExp } from './regExp';

import {
  setBreakpointOnResizeEvent,
  getDomPropertyEvent,
  getDisplayStateOnScrollEvent,
  getIsArrivedToElOnScrollEvent,
  setSetRefsPropertyEvent
} from './windowEvents';

import {
  useSetBreakpoint,
  useTimerWithToggle,
  didMount,
  didFirstUpdate
} from './hooks/useHooks';

import {
  useDidUpdate,
  useIntersectionObserver,
  useAddWindowEvent,
  useAddCssInBody
} from './hooks/useEffects';

import {
  useGetDomProperty,
  useGetDomProperties
} from './hooks/useLayoutEffects';

import { useGlobalState } from './hooks/useGlobalState';

export {
  defaultTheme,
  genTheme,
  resetGlobalStyle,
  createAppMaterials,
  createPageMaterials,
  createComponentMaterials,
  getComponentMaterials
};

export {
  deepMerge,
  deepMergeOverrideArray,
  genUniqueId,
  createOptimizedEvent,
  extractOverlapObjectProperty,
  toCamelCase,
  fromCamelCase,
  roundNumber
};

export {
  keyframes,
  getFontSize,
  genTransitionProperty,
  genReactCSSTransitionStyle,
  genSimpleTransitionStyle,
  assignTransitionDuration
};

export {
  toFullHexa,
  hexa2rgba,
  hexa2hsla,
  rgba2hsla,
  cssRgb2Array,
  toCssColor,
  LightenDarkenHex,
  adustBrightness,
  adustBrightnessFromCssRgb
};

export {
  isReact,
  isReactComponent,
  isReactElement,
  isArray,
  isEmptyArray,
  isObject,
  isEmptyObject,
  isNumber,
  isNaN,
  isInteger,
  isEven,
  isOdd,
  isString,
  isEmptyString,
  isBoolean,
  isFunction,
  isDate,
  getType
};

export {
  extractCurrentScreenSizeProps,
  useGetInitBreakpoint,
  getComponentByBreakpoint
};

export { testCssNumberRegExp };

export {
  setBreakpointOnResizeEvent,
  getDomPropertyEvent,
  getDisplayStateOnScrollEvent,
  getIsArrivedToElOnScrollEvent,
  setSetRefsPropertyEvent
};

export { useSetBreakpoint, useTimerWithToggle, didMount, didFirstUpdate };

export {
  useDidUpdate,
  useIntersectionObserver,
  useAddWindowEvent,
  useAddCssInBody
};

export { useGetDomProperty, useGetDomProperties };

export { useGlobalState };
