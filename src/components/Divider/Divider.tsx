import React from 'react';
import { BaseElement } from '../_Elements';

const Divider = (props) => {
	const mainStyle = React.useMemo(() => {
		return {
			flexShrink: '0',
			backgroundColor: 'rgba(0, 0, 0, 0.12);'
		};
	}, []);
	return <BaseElement elementName="hr" style={mainStyle} {...props} />;
};

export default Divider;
