import React, { useMemo } from 'react';
import $ from './_constants';
import {
	roundNumber,
	testCssNumberRegExp,
	getType,
	isString,
	isArray,
	isObject,
	getFontSize,
	keyframes
} from 'scripts';
import iconList from 'src/icons';
import { SVG } from '..';

const $styles = $.styles;
const $names = $.names;

const getIcon = (name) => {
	const icon = iconList.get(name);
	if (!icon) return null;
	const w = icon.viewBox[2];
	const h = icon.viewBox[3];
	const ratio = roundNumber(w / h, 3);
	return {
		...icon,
		ratio: ratio
	};
};

const getName = (type, icon) => {
	let name = '';

	if (type === 'string') {
		name = icon;
	} else if (type === 'array') {
		name = icon.join('-');
	} else if (type === 'object') {
		if (isString(icon.name)) {
			name = icon.name;
		} else if (isArray(icon.name)) {
			icon.name.join('-');
		}
	}

	return name;
};

const Icon = ({
	icon,
	role = 'icon',
	symbol,
	use,
	currentColor,
	size,
	fixedWidth,
	pull,
	border,
	rotation,
	flip,
	spin,
	pulse,
	marginLeft,
	marginRight,
	...props
}) => {
	const [ iconData, others ] = useMemo(
		() => {
			const iconType = getType(icon);

			const name = getName(iconType, icon);

			const iconData =
				iconType === 'object'
					? {
							type: 'inline',
							viewBox: icon.viewBox,
							path: icon.path,
							tag: icon.tag,
							title: icon.title || ''
						}
					: getIcon(name);

			const isPath = !!iconData.path;

			const baseName = `uc-svg-i-${iconData.type}`;

			let others = {};

			if (currentColor || isPath) others.fill = $styles.currentColor;

			if (use) {
				others = {
					...others,
					_className_: `${baseName}-use-${name}`,
					use: true,
					xlinkHref: `#${baseName}-symbol-${name}`
				};
			} else {
				others = {
					...others,
					viewBox: iconData.viewBox,
					path: iconData.path,
					tag: iconData.tag
				};
				if (symbol) {
					others = {
						...others,
						symbol: true,
						_className_: `${baseName}-symbol-${name}`,
						_id_: `${baseName}-symbol-${name}`
					};
				} else {
					others = {
						...others,
						_className_: `${baseName}-${name}`
					};
				}
			}

			return [ iconData, others ];
		},
		[ icon, use, symbol ]
	);

	if (!iconData) return null;

	const _style_ = useMemo(
		() => {
			let style = {};

			if (marginLeft) style.marginLeft = isString(marginLeft) ? marginLeft : $styles.marginLeft;
			if (marginRight) style.marginRight = isString(marginRight) ? marginRight : $styles.marginRight;

			if (size) style.fontSize = getFontSize(size);

			const height = border ? $styles.heightOnBorder : $styles.height;
			const widthRatioOnFixed = $styles.widthRatioOnFixed;
			const precision = $styles.precision;

			if (fixedWidth && !border) {
				style.width =
					typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
						? fixedWidth
						: `${roundNumber(height * widthRatioOnFixed, precision)}em`;
			} else {
				style.width = `${roundNumber(height * iconData.ratio, precision)}em`;
			}

			if (border) {
				const borderIsObject = isObject(border);
				if (borderIsObject) {
					style = { ...style, ...border };
				} else {
					style = {
						...style,
						height: `${height}em`,
						...$styles.border
					};
				}
				if (fixedWidth) {
					style.width =
						typeof fixedWidth === 'string' && testCssNumberRegExp.test(fixedWidth)
							? fixedWidth
							: `${roundNumber(height * widthRatioOnFixed, precision)}em`;
				} else {
					style.width = `${roundNumber(height * iconData.ratio, precision)}em`;
				}
			}

			if (pull === 'left') {
				style = {
					...style,
					...$styles.pullLeft
				};
			} else if (pull === 'right') {
				style = {
					...style,
					...$styles.pullRight
				};
			}

			if (rotation || flip) {
				const transformList = [];

				if (rotation) {
					const rotate = `rotate(${rotation}deg)`;
					transformList.push(rotate);
				}
				if (flip) {
					let scale;
					flip === 'horizontal' && (scale = $styles.flipHorizontal);
					flip === 'vertical' && (scale = $styles.flipVertical);
					flip === 'both' && (scale = $styles.flipBoth);
					transformList.push(scale);
				}

				style['transform'] = transformList.join(' ');
			}

			if (spin || pulse) {
				const rotateAnimation = keyframes({
					from: $styles.roll.from,
					to: $styles.roll.to
				});
				spin
					? (style.animation = `${rotateAnimation} ${isString(spin) ? spin : $styles.roll.spin}`)
					: (style.animation = `${rotateAnimation} ${isString(pulse) ? pulse : $styles.roll.pulse}`);
			}

			return { ...$styles.style, ...style };
		},
		[ icon, currentColor, size, fixedWidth, pull, border, rotation, flip, spin, pulse, marginLeft, marginRight ]
	);

	return <SVG _style_={_style_} role={role} {...others} {...props} />;
};

export default Icon;
