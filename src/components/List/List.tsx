import * as React from 'react';
import $ from './_constants';
import { BaseElement } from '..';

const $styles = $.styles;
const $names = $.names;
const $selectors = $.selectors;

const addLeftSpace = (children, space = 1, levelStyle = [], level) => {
	if (!level) level = 0;
	level += 1;
	const inner = Array.isArray(children) ? children : [ children ];
	const style = {};
	const paddingLeftValue = `${space * level}em`;
	inner.forEach((v, i) => {
		if (React.isValidElement(v) && typeof v === 'function' && v.type.name === 'ListGroup') {
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
	const _style_ = React.useMemo(
		() => {
			return {
				width: width,
				...addLeftSpace(children, space, levelStyle)
			};
		},
		[ width, children, space, levelStyle ]
	);

	return (
		<BaseElement _style_={_style_} _className_={$names.ucList} {...props}>
			{children}
		</BaseElement>
	);
};

// -------------------------------------------------------------

const ListGroup = ({ children, title, titleStyle: propTitleStyle, ...props }) => {
	const titleComponent = React.useMemo(
		() => {
			if (title) {
				if (typeof title === 'string') {
					const titleStyle = $styles.group.title;
					return (
						<BaseElement style={{ ...titleStyle, ...propTitleStyle }}>
							<BaseElement>{title}</BaseElement>
						</BaseElement>
					);
				} else if (React.isValidElement(title)) {
					return title;
				}
			}
		},
		[ title ]
	);

	return (
		<BaseElement tagName="li" _className_={$names.ucListGroup} {...props}>
			{titleComponent}
			<BaseElement tagName="ul">{children}</BaseElement>
		</BaseElement>
	);
};

// -------------------------------------------------------------

const ListItem = ({ children, ...props }) => {
	return (
		<BaseElement tagName="li" _style_={$styles.item.main} {...props}>
			<BaseElement tagName="div">{children}</BaseElement>
		</BaseElement>
	);
};

List.Group = ListGroup;
List.Item = ListItem;

export default List;
