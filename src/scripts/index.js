import {
	defaultTheme,
	genTheme,
	resetGlobalStyle,
	createAppConstants,
	createPageConstants,
	createComponentConstants,
	getComponentConstants
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
	reflow,
	getFontSize,
	genTransitionProp,
	genTransitionProperty,
	genReactCSSTransitionStyle,
	genSimpleTransitionStyle,
	assignTransitionDuration,
	genDurations,
	genEasings,
	getTranslateFromComputedStyle
} from './style';
import {
	focusTrap,
	mousetrap,
	scrollLock,
	ownerDocument,
	ownerWindow,
	clickedScrollbar,
	testPassiveEventSupport,
	addEventListener,
	removeEventListener,
	getTransitionEndName,
	getNode,
	getElementRef
} from './domHelpers';
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
} from './color';
import {
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
	isReact,
	isReactComponent,
	isReactElement,
	isUndefined,
	getType
} from './checkTypes';
import { extractCurrentScreenSizeProps, useGetInitBreakpoint, getComponentByBreakpoint } from './breakpoint';
import { testCssNumberRegExp } from './regExp';
import {
	setBreakpointOnResizeEvent,
	getDomPropertyEvent,
	getDisplayStateOnScrollEvent,
	getIsArrivedToElOnScrollEvent,
	setSetRefsPropertyEvent
} from './windowEvents';
import { useSetBreakpoint, useLateUpdate, didMount, didFirstUpdate } from './hooks/useHooks';
import {
	useAddEventListener,
	useDidUpdate,
	useIntersectionObserver,
	useAddWindowEvent,
	useAddCssInBody
} from './hooks/useEffects';
import { useGetDomProperty, useGetDomProperties } from './hooks/useLayoutEffects';
import { useGlobalState } from './hooks/useGlobalState';
import { setTransition, setTransform } from './setCssProp';

export {
	// init
	defaultTheme,
	genTheme,
	resetGlobalStyle,
	createAppConstants,
	createPageConstants,
	createComponentConstants,
	getComponentConstants,
	// utils
	deepMerge,
	deepMergeOverrideArray,
	genUniqueId,
	createOptimizedEvent,
	extractOverlapObjectProperty,
	toCamelCase,
	fromCamelCase,
	roundNumber,
	// style
	keyframes,
	reflow,
	getFontSize,
	genTransitionProp,
	genTransitionProperty,
	genReactCSSTransitionStyle,
	genSimpleTransitionStyle,
	assignTransitionDuration,
	genEasings,
	genDurations,
	getTranslateFromComputedStyle,
	// domHelpers
	focusTrap,
	mousetrap,
	scrollLock,
	ownerDocument,
	ownerWindow,
	clickedScrollbar,
	testPassiveEventSupport,
	addEventListener,
	removeEventListener,
	getTransitionEndName,
	getNode,
	getElementRef,
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
	isReact,
	isReactComponent,
	isReactElement,
	isUndefined,
	getType,
	// breakpoint
	extractCurrentScreenSizeProps,
	useGetInitBreakpoint,
	getComponentByBreakpoint,
	// regExp
	testCssNumberRegExp,
	// windowEvents
	setBreakpointOnResizeEvent,
	getDomPropertyEvent,
	getDisplayStateOnScrollEvent,
	getIsArrivedToElOnScrollEvent,
	setSetRefsPropertyEvent,
	// hooks/useHooks
	useSetBreakpoint,
	useLateUpdate,
	didMount,
	didFirstUpdate,
	// hooks/hooks/useEffects
	useAddEventListener,
	useDidUpdate,
	useIntersectionObserver,
	useAddWindowEvent,
	useAddCssInBody,
	// hooks/useLayoutEffects
	useGetDomProperty,
	useGetDomProperties,
	// hooks/useGlobalState
	useGlobalState,
	// setCssProp
	setTransition,
	setTransform
};
