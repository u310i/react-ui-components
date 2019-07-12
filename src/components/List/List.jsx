import React, { useMemo } from 'react';
import $ from './_constants';
import { isString, isReact, isArray, isReactComponent } from 'scripts';
import { UlElement, LiElement, DivElement, SpanElement } from '..';

const $styles = $.styles;
const $names = $.names;
const $selectors = $.selectors;

const addLeftSpace = (children, space = 1, levelStyle = [], level) => {
	if (!level) level = 0;
	level += 1;
	const inner = isArray(children) ? children : [ children ];
	const style = {};
	const paddingLeftValue = `${space * level}em`;
	inner.forEach((v, i) => {
		if (isReactComponent(v) && v.type.name === 'ListGroup') {
			const innerStyle = addLeftSpace(v.props.children, space, levelStyle, level);
			if (v.props.title) {
				style[$selectors.nthChild(i + 1)] = {
					[$selectors.divFirstChild]: {
						paddingLeft: paddingLeftValue,
						...levelStyle[level - 1]
					},
					[$selectors.ulSecondChild]: {
						...innerStyle
					}
				};
			}
		} else {
			style[$selectors.nthChild(i + 1)] = {
				paddingLeft: paddingLeftValue,
				...levelStyle[level - 1]
			};
		}
	});
	return style;
};

const List = ({ children, width = $styles.list.width, space, levelStyle, ...props }) => {
	const _style_ = useMemo(
		() => {
			return {
				width: width,
				...addLeftSpace(children, space, levelStyle)
			};
		},
		[ width, children, space, levelStyle ]
	);

	return (
		<UlElement _style_={_style_} _className_={$names.ucList} {...props}>
			{children}
		</UlElement>
	);
};

// -------------------------------------------------------------

const ListGroup = ({ children, title, titleStyle: propTitleStyle, ...props }) => {
	const titleComponent = useMemo(
		() => {
			if (title) {
				if (isString(title)) {
					const titleStyle = $styles.group.title;
					return (
						<DivElement style={{ ...titleStyle, ...propTitleStyle }}>
							<SpanElement>{title}</SpanElement>
						</DivElement>
					);
				} else if (isReact(title)) {
					return title;
				}
			}
		},
		[ title ]
	);

	return (
		<LiElement _className_={$names.ucListGroup} {...props}>
			{titleComponent}
			<UlElement>{children}</UlElement>
		</LiElement>
	);
};

// -------------------------------------------------------------

const ListItem = ({ children, ...props }) => {
	return (
		<LiElement _style_={$styles.item.main} {...props}>
			<DivElement>{children}</DivElement>
		</LiElement>
	);
};

List.Group = ListGroup;
List.Item = ListItem;

export default List;
