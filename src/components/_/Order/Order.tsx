import * as React from 'react';

const Order = ({ children, list = [] }) => {
	const contents = list.map((item, index) => {
		if (Object.prototype.toString.call(item) === '[object Object]') {
			const props = item;
			if (!props.key) props.key = index;
			return children({ props });
		}

		if (Array.isArray(item)) {
			let props = {};
			let child;
			if (Object.prototype.toString.call(item[0]) === '[object Object]') props = item[0];
			if (!props.key) props.key = index;
			child = item[1] || '';
			return children({ props, child });
		}
	});

	return <React.Fragment>{contents}</React.Fragment>;
};

export default Order;
