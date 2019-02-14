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
} from './styleUtils';

import {
  toFullHexa,
  hexa2rgba,
  hexa2hsla,
  rgba2hsla,
  toCssColor,
  LightenDarkenHex
} from './colorUtils';

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
} from './breakpointUtils';

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
  toCssColor,
  LightenDarkenHex
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
