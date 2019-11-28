import {
  // defaultTheme,
  // genTheme,
  // resetGlobalStyle,
  createAppConstants,
  createPageConstants,
  createComponentConstants,
  getComponentConstants
} from "./constants";
import mergeObject from "./mergeObject";
import {
  raf,
  deepMerge,
  deepMergeOverrideArray,
  keyframes,
  mousetrap,
  scrollLock
} from "./library";
import {
  addEventListener,
  testPassiveEventSupport,
  genUniqueId,
  createOptimizedEvent,
  lazyEvent,
  toCamelCase,
  fromCamelCase,
  roundNumber,
  reflow,
  getFontSize,
  genTransitionProperty,
  genDurations,
  genEasings,
  setTransition,
  setTransform,
  ownerDocument,
  ownerWindow,
  clickedScrollbar,
  getTransitionEndName,
  extractElement,
  injectElementToRef,
  deeplyChildren
} from "./utils";
import {
  toFullHexa,
  hexa2rgba,
  rgba2hsla,
  hexa2hsla,
  cssRgb2Array,
  toCssColor,
  LightenDarkenHex,
  adjustBrightness,
  adjustBrightnessFromCssRgb
} from "./color";
import {
  isReactComponentChildren,
  isTransitionComponent,
  // isArray,
  // isEmptyArray,
  isObject,
  // isEmptyObject,
  isNumber,
  // isNaN,
  isInteger,
  isEven,
  isOdd,
  // isString,
  // isEmptyString,
  // isBoolean,
  // isFunction,
  isDate
  // isReact,
  // isReactComponent,
  // isReactElement,
  // isUndefined,
  // getType
} from "./checkTypes";
// import {} from './breakpoint';
import { testCssNumberRegExp } from "./regExp";
// import {} from './windowEvents';
import {
  useForceUpdate,
  useLateUpdate
  // useAddWindowEvent,
  // useAddCssInBody,
  // useGetDomProperty,
  // useGetDomProperties,
  // useGlobalState,
} from "./hooks";
// import { useAddWindowEvent, useAddCssInBody } from './hooks/useEffects';
// import {
//   useGetDomProperty,
//   useGetDomProperties,
// } from './hooks/useLayoutEffects';
// import { useGlobalState } from './hooks/useGlobalState';

export {
  // constants
  createAppConstants,
  createPageConstants,
  createComponentConstants,
  getComponentConstants,
  // mergeObject
  mergeObject,
  // library
  raf,
  deepMerge,
  deepMergeOverrideArray,
  keyframes,
  mousetrap,
  scrollLock,
  // utils
  addEventListener,
  testPassiveEventSupport,
  genUniqueId,
  createOptimizedEvent,
  lazyEvent,
  toCamelCase,
  fromCamelCase,
  roundNumber,
  reflow,
  getFontSize,
  genTransitionProperty,
  genEasings,
  genDurations,
  setTransition,
  setTransform,
  ownerDocument,
  ownerWindow,
  clickedScrollbar,
  getTransitionEndName,
  extractElement,
  injectElementToRef,
  deeplyChildren,
  // domHelpers

  // color
  toFullHexa,
  hexa2rgba,
  rgba2hsla,
  hexa2hsla,
  cssRgb2Array,
  toCssColor,
  LightenDarkenHex,
  adjustBrightness,
  adjustBrightnessFromCssRgb,
  // checkTypes
  isReactComponentChildren,
  isTransitionComponent,
  isObject,
  isNumber,
  isInteger,
  isEven,
  isOdd,
  isDate,
  // breakpoint
  // regExp
  testCssNumberRegExp,
  // windowEvents
  // hooks/useHooks
  useForceUpdate,
  useLateUpdate
  // useAddWindowEvent,
  // useAddCssInBody,
  // useGetDomProperty,
  // useGetDomProperties,
  // useGlobalState,
  // hooks/hooks/React.useEffects
  // hooks/React.useLayoutEffects
  // hooks/useGlobalState
};
