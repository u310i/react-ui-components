import * as React from 'react';
import $ from './_constants';
import { roundNumber } from 'scripts';
import { BaseElement } from '..';

const $styles = $.styles;

const SVG = ({
	viewBox,
	path,
	tag,
	innerProps = {},
	symbol,
	use,
	xlinkHref,
	transform = false,
	title,
	desc,
	role = $styles.role,
	style = {},
	...props
}) => {
	const titleTag = title && <BaseElement tagName="title">{title}</BaseElement>;
	const descTag = desc && <BaseElement tagName="desc">{desc}</BaseElement>;

	props.role = role;
	style.pointerEvents = $styles.pointerEvents;
	props.style = style;

	let createGroupedComponent;
	if (transform) {
		const x = roundNumber(viewBox[2] / 2, 6);
		const y = roundNumber(viewBox[3] / 2, 6);

		const forInnerGroup = `translate(${x * -1}, ${y * -1})`;
		const forOuterGroup = `translate(${x}, ${y})`;

		innerProps = { transform: forInnerGroup, ...innerProps };

		createGroupedComponent = (inner) => (
			<BaseElement tagName="g" transform={forOuterGroup}>
				<BaseElement tagName="g" transform={transform}>
					{inner}
				</BaseElement>
			</BaseElement>
		);
	}

	const Path = path && <path {...innerProps} d={path} />;
	const Tag = !path &&
	tag && <BaseElement tagName="g" {...innerProps} dangerouslySetInnerHTML={{ __html: tag }} />;

	const InnerComponent = transform ? createGroupedComponent(Path || Tag) : Path || Tag;

	if (symbol) {
		return (
			<BaseElement
				tagName="svg"
				display={$styles.symbolDisplay}
				xmlns={$styles.xmlns}
				xmlnsXlink={$styles.xmlnsXlink}
			>
				<BaseElement tagName="symbol" viewBox={viewBox.join(' ')} {...props}>
					{InnerComponent}
				</BaseElement>
			</BaseElement>
		);
	}
	if (use) {
		return (
			<BaseElement tagName="svg" {...props} xmlns={$styles.xmlns} xmlnsXlink={$styles.xmlnsXlink}>
				{titleTag}
				{descTag}
				<BaseElement tagName="use" xlinkHref={xlinkHref} />
			</BaseElement>
		);
	} else {
		return (
			<BaseElement
				tagName="svg"
				viewBox={viewBox.join(' ')}
				{...props}
				xmlns={$styles.xmlns}
				xmlnsXlink={$styles.xmlnsXlink}
			>
				{titleTag}
				{descTag}
				{InnerComponent}
			</BaseElement>
		);
	}
};

export default SVG;
