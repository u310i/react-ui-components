// export const genTransitionProperty = (style) => {
// 	return Object.keys(style)
// 		.map((value) => {
// 			return fromCamelCase(value, '-');
// 		})
// 		.join();
// };

// export const genReactCSSTransitionStyle = (name, fn, isAppear = false) => {
// 	const { defaultStyle, appear, appearActive, enter, enterActive, enterDone, exit, exitActive, exitDone } = fn();

// 	return {
// 		...defaultStyle || {},
// 		[`&.${name}-appear`]: isAppear ? appear || enter : {},
// 		[`&.${name}-appear-active`]: isAppear ? appearActive || enterActive : {},
// 		[`&.${name}-enter`]: enter,
// 		[`&.${name}-enter-active`]: enterActive,
// 		[`&.${name}-enter-done`]: enterDone || exit,
// 		[`&.${name}-exit`]: exit,
// 		[`&.${name}-exit-active`]: exitActive,
// 		[`&.${name}-exit-done`]: exitDone || enter
// 	};
// };

// export const genSimpleTransitionStyle = (
// 	name,
// 	{ defaultStyle, beforeStyle: preBeforeStyle, afterStyle, baseStyle },
// 	duration,
// 	timingFunction,
// 	isAppear = false
// ) => {
// 	const beforeStyle = baseStyle
// 		? {
// 				...extractOverlapObjectProperty(afterStyle, baseStyle),
// 				...preBeforeStyle
// 			}
// 		: preBeforeStyle;
// 	const transitionProperty = genTransitionProperty({
// 		...beforeStyle,
// 		...afterStyle
// 	});

// 	return genReactCSSTransitionStyle(
// 		name,
// 		() => {
// 			return {
// 				defaultStyle: defaultStyle,
// 				enter: beforeStyle,
// 				enterActive: {
// 					...afterStyle,
// 					transitionProperty: transitionProperty,
// 					transitionDuration: `${duration}ms`,
// 					transitionTimingFunction: timingFunction
// 				},
// 				exit: afterStyle,
// 				exitActive: {
// 					...beforeStyle,
// 					transitionProperty: transitionProperty,
// 					transitionDuration: `${duration}ms`,
// 					transitionTimingFunction: timingFunction
// 				}
// 			};
// 		},
// 		isAppear
// 	);
// };

// export const assignTransitionDuration = (name, style, duration, isAppear = false) => {
// 	return {
// 		[`&.${name}-appear-active`]: isAppear
// 			? {
// 					...style[`&.${name}-appear-active`],
// 					transitionDuration: `${duration}ms`
// 				}
// 			: {},
// 		[`&.${name}-enter-active`]: {
// 			...style[`&.${name}-enter-active`],
// 			transitionDuration: `${duration}ms`
// 		},
// 		[`&.${name}-exit-active`]: {
// 			...style[`&.${name}-exit-active`],
// 			transitionDuration: `${duration}ms`
// 		}
// 	};
// };

// export const getTranslateFromComputedStyle = (node) => {
// 	const rect = node.getBoundingClientRect();

// 	const computedStyle = window.getComputedStyle(node);
// 	const transform =
// 		computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
// 	let offsetX = 0;
// 	let offsetY = 0;
// 	if (transform && transform !== 'none' && typeof transform === 'string') {
// 		const transformValues = transform.split('(')[1].split(')')[0].split(',');
// 		offsetX = parseInt(transformValues[4], 10);
// 		offsetY = parseInt(transformValues[5], 10);
// 		return [ offsetX, offsetY ];
// 	}
// };
