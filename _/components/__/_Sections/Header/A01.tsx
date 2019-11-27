import * as React from 'react';
import Flex from 'components/Flex';
import AppBar from 'components/AppBar';
import { Generator as GenerateDrawer } from 'components/Drawer';

export default ({ style, appbar, drawer, verticalMenu }) => {
	const drawerPortal = React.useMemo(() => document.getElementById('app'), []);
	const drawerContainer = React.useMemo(
		() =>
			GenerateDrawer({
				drawerPortal,
				...drawer
			}),
		[ drawer ]
	);

	return (
		<nav>
			<Flex.Row>{drawerContainer.toggleButton}</Flex.Row>
			{drawerContainer.component}
		</nav>
	);
};
