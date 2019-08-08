import * as React from 'react';
import { Icon, BaseElement } from '..';
import { getComponentConstants } from 'scripts';

const $ = getComponentConstants('button');
const $names = $.contents.names;
const $styles = $.contents.styles;

const LoadingIcon = ({ style: propStyle = {} }) => {
	return (
		<BaseElement elementName="i" key={$names.loading} style={propStyle} className={$names.ucButtonLoading}>
			<Icon icon={$names.sysLoading} spin />
		</BaseElement>
	);
};

return LoadingIcon;
