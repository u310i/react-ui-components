import React, { useCallback, useMemo, useContext } from 'react';
import $ from './_constants';
import { getFontSize, keyframes, useSlowActingToggle } from 'scripts';
import { ButtonElement, DivElement } from '..';
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
	onClick: propOnClick,
	...props
}) => {
	const [ toggleState, setToggleState ] = useSlowActingToggle($styles.clickEffectDuration);

	const hasClickEffect = clickEffect && !disable && !loading;

	const onClick = useCallback(
		() => {
			propOnClick && propOnClick();
			hasClickEffect && setToggleState();
		},
		[ propOnClick, hasClickEffect ]
	);

	const mainStyle = $styles.main;

	const clickEffectStyle = useMemo(
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

	const loadingMaskStyle = useMemo(
		() => {
			return loading ? scripts.genLoadingMask(borderWidth) : {};
		},
		[ loading, borderWidth ]
	);

	const shapeStyle = useMemo(
		() => {
			const style = {
				...scripts.genShape(shape),
				...(loading ? $styles.loading : {}),
				...(fullWidth ? $styles.fullWidth : {}),
				...(fullHeight ? $styles.fullHeight : {})
			};
			style.fontSize = size ? getFontSize(size) : $styles.fontSize;
			style.borderStyle = borderStyle || $styles.borderStyle;
			style.borderWidth = borderWidth || $styles.borderWidth;

			return style;
		},
		[ shape, size, borderStyle, borderWidth, fullWidth, fullHeight, loading ]
	);

	const colorStyle = useMemo(
		() => {
			return scripts.genColor(type, toFill, disable, keyColor);
		},
		[ keyColor, type, toFill, disable ]
	);

	const style = useMemo(
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

	let contents = useMemo(
		() => {
			return scripts.defineContents(children, between, loading);
		},
		[ children, between, loading ]
	);

	const clickEffectComponent = useMemo(
		() => {
			return (
				toggleState !== undefined &&
				hasClickEffect && <DivElement key={toggleState} aria-hidden={true} style={clickEffectStyle} />
			);
		},
		[ toggleState, hasClickEffect ]
	);

	const loadingMaskComponent = useMemo(
		() => {
			return loading && <DivElement aria-hidden={true} style={loadingMaskStyle} />;
		},
		[ loading ]
	);

	const accessibilityProps = useMemo(
		() => {
			const props = {};
			if (disable) props['aria-disabled'] = true;
			if (loading) props['aria-busy'] = true;
			return props;
		},
		[ disable, loading ]
	);

	return (
		<ButtonElement style={style} onClick={onClick} disabled={disable || loading} {...accessibilityProps} {...props}>
			{contents}
			{loadingMaskComponent}
			{clickEffectComponent}
		</ButtonElement>
	);
};

Button.Group = ButtonGroup;
Button.Coordinator = ButtonCoordinator;

export default Button;
