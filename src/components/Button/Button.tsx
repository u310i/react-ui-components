import React from 'react';
import $ from './_constants';
import { getFontSize, keyframes, useLateUpdate } from 'scripts';
import { BaseElement } from '..';
import ButtonCoordinator from './ButtonCoordinator';
import ButtonGroup from './ButtonGroup';
import scripts from './_scripts';

const $styles = $.styles;

const Button = ({
	children,
	style: propStyle,
	color: keyColor,
	type,
	toFill,
	loading,
	disable,
	effectColor,
	between,
	shape,
	size,
	fullWidth,
	fullHeight,
	borderStyle,
	borderWidth,
	clickEffect = true,
	onClick,
	test,
	...props
}) => {
	const [ lateUpdateStatus, lateUpdate ] = useLateUpdate($styles.clickEffectDuration);

	const hasClickEffect = clickEffect && !disable && !loading;

	const handleClick = React.useCallback(
		() => {
			onClick && onClick();
			hasClickEffect && lateUpdate();
		},
		[ onClick, hasClickEffect ]
	);

	const mainStyle = $styles.main;

	const clickEffectStyle = React.useMemo(
		() => {
			const waveKeyframes = keyframes(scripts.genWaveKeyframes(borderWidth));
			const fadeKeyframes = keyframes({
				to: {
					...$styles.fadeKeyframes
				}
			});
			const style = scripts.genClickEffectStyle(borderWidth, effectColor, waveKeyframes, fadeKeyframes);
			return style;
		},
		[ borderWidth, effectColor ]
	);

	const loadingMaskStyle = React.useMemo(
		() => {
			return loading ? scripts.genLoadingMask(borderWidth) : {};
		},
		[ loading, borderWidth ]
	);

	const shapeStyle = React.useMemo(
		() => {
			const style = {
				...scripts.genShape(shape),
				...loading ? $styles.loading : {},
				...fullWidth ? $styles.fullWidth : {},
				...fullHeight ? $styles.fullHeight : {}
			};
			style.fontSize = size ? getFontSize(size) : $styles.fontSize;
			style.borderStyle = borderStyle || $styles.borderStyle;
			style.borderWidth = borderWidth || $styles.borderWidth;

			return style;
		},
		[ shape, size, borderStyle, borderWidth, fullWidth, fullHeight, loading ]
	);

	const colorStyle = React.useMemo(
		() => {
			return scripts.genColor(type, toFill, disable, keyColor);
		},
		[ keyColor, type, toFill, disable ]
	);

	const style = React.useMemo(
		() => {
			return {
				...mainStyle,
				...shapeStyle,
				...colorStyle,
				...propStyle
			};
		},
		[ shapeStyle, colorStyle, propStyle ]
	);

	let contents = React.useMemo(
		() => {
			return scripts.defineContents(children, between, loading);
		},
		[ children, between, loading ]
	);

	const clickEffectComponent = React.useMemo(
		() => {
			return (
				lateUpdateStatus &&
				hasClickEffect && (
					<BaseElement tagName="div" key={lateUpdateStatus} aria-hidden={true} style={clickEffectStyle} />
				)
			);
		},
		[ lateUpdateStatus, hasClickEffect ]
	);

	const loadingMaskComponent = React.useMemo(
		() => {
			return loading && <BaseElement tagName="div" aria-hidden={true} style={loadingMaskStyle} />;
		},
		[ loading ]
	);

	const accessibilityProps = React.useMemo(
		() => {
			const props = {};
			if (disable) props['aria-disabled'] = true;
			if (loading) props['aria-busy'] = true;
			return props;
		},
		[ disable, loading ]
	);

	return (
		<BaseElement
			tagName="button"
			style={style}
			onClick={handleClick}
			disabled={disable || loading}
			{...accessibilityProps}
			{...props}
		>
			{contents}
			{loadingMaskComponent}
			{clickEffectComponent}
		</BaseElement>
	);
};

Button.Group = ButtonGroup;
Button.Coordinator = ButtonCoordinator;

export default Button;
