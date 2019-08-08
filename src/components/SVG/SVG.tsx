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
	const titleTag = title && <BaseElement elementName="title">{title}</BaseElement>;
	const descTag = desc && <BaseElement elementName="desc">{desc}</BaseElement>;

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
			<BaseElement elementName="g" transform={forOuterGroup}>
				<BaseElement elementName="g" transform={transform}>
					{inner}
				</BaseElement>
			</BaseElement>
		);
	}

	const Path = path && <path {...innerProps} d={path} />;
	const Tag = !path &&
	tag && <BaseElement elementName="g" {...innerProps} dangerouslySetInnerHTML={{ __html: tag }} />;

	const InnerComponent = transform ? createGroupedComponent(Path || Tag) : Path || Tag;

	if (symbol) {
		return (
			<BaseElement
				elementName="svg"
				display={$styles.symbolDisplay}
				xmlns={$styles.xmlns}
				xmlnsXlink={$styles.xmlnsXlink}
			>
				<BaseElement elementName="symbol" viewBox={viewBox.join(' ')} {...props}>
					{InnerComponent}
				</BaseElement>
			</BaseElement>
		);
	}
	if (use) {
		return (
			<BaseElement elementName="svg" {...props} xmlns={$styles.xmlns} xmlnsXlink={$styles.xmlnsXlink}>
				{titleTag}
				{descTag}
				<BaseElement elementName="use" xlinkHref={xlinkHref} />
			</BaseElement>
		);
	} else {
		return (
			<BaseElement
				elementName="svg"
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
