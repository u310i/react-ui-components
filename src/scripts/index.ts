import {
	// defaultTheme,
	// genTheme,
	// resetGlobalStyle,
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
	toCamelCase,
	fromCamelCase,
	roundNumber
} from './utils';
import { keyframes, reflow, getFontSize, genTransitionProperty, genDurations, genEasings } from './style';
import {
	focusTrap,
	mousetrap,
	scrollLock,
	ownerDocument,
	ownerWindow,
	clickedScrollbar,
	testPassiveEventSupport,
	addEventListener,
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
	// isArray,
	// isEmptyArray,
	// isObject,
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
} from './checkTypes';
// import {} from './breakpoint';
import { testCssNumberRegExp } from './regExp';
// import {} from './windowEvents';
import { useLateUpdate } from './hooks/useHooks';
import { useAddWindowEvent, useAddCssInBody } from './hooks/useEffects';
import { useGetDomProperty, useGetDomProperties } from './hooks/useLayoutEffects';
import { useGlobalState } from './hooks/useGlobalState';
import { setTransition, setTransform } from './setCssProp';

export {
	// init
	// defaultTheme,
	// genTheme,
	// resetGlobalStyle,
	createAppConstants,
	createPageConstants,
	createComponentConstants,
	getComponentConstants,
	// utils
	deepMerge,
	deepMergeOverrideArray,
	genUniqueId,
	createOptimizedEvent,
	toCamelCase,
	fromCamelCase,
	roundNumber,
	// style
	keyframes,
	reflow,
	getFontSize,
	genTransitionProperty,
	genEasings,
	genDurations,
	// domHelpers
	focusTrap,
	mousetrap,
	scrollLock,
	ownerDocument,
	ownerWindow,
	clickedScrollbar,
	testPassiveEventSupport,
	addEventListener,
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
	useLateUpdate,
	// hooks/hooks/React.useEffects
	useAddWindowEvent,
	useAddCssInBody,
	// hooks/React.useLayoutEffects
	useGetDomProperty,
	useGetDomProperties,
	// hooks/useGlobalState
	useGlobalState,
	// setCssProp
	setTransition,
	setTransform
};
