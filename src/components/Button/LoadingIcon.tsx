import React from 'react';
import { Icon, IElement } from '..';
import { getComponentConstants } from 'scripts';

const $ = getComponentConstants('button');
const $names = $.contents.names;
const $styles = $.contents.styles;

const LoadingIcon = ({ style: propStyle = {} }) => {
	return (
		<IElement key={$names.loading} style={propStyle} className={$names.ucButtonLoading}>
			<Icon icon={$names.sysLoading} spin />
		</IElement>
	);
};

return LoadingIcon;
