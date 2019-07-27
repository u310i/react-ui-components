import React from 'react';
import { Icon } from '..';
import Button from './Button';

const getChild = (item, index) => {
	if (!item) return;
	if (typeof item === 'string') {
		return item;
	} else if (item.icon) {
		return <Icon key={index} {...item} />;
	} else {
		return;
	}
};

const createButton = (contents, props, group = {}, index = null) => {
	const { childPropList = [], ...groupProps } = group;
	let isGroup = false;
	const children = contents.map((item, i) => {
		if (Array.isArray(item)) {
			isGroup = true;
			return createButton(item, { ...props, ...childPropList[i] }, {}, i);
		}
		return getChild(item, i);
	});

	const key =
		index || index === 0
			? {
					key: index
				}
			: {};

	return isGroup ? (
		<Button.Group {...key} {...groupProps}>
			{children}
		</Button.Group>
	) : (
		<Button {...key} {...props}>
			{children}
		</Button>
	);
};

const Coordinator = ({ contents = [], group = {}, ...props }) => {
	return createButton(contents, props, group);
};

export default Coordinator;
