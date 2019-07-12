import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'Drawer';

const constants = {
	names: {
		ucDrawer: 'uc-drawer',
		ucDrawerContainer: 'uc-drawer-container',
		ucDrawerTransition: 'uc-drawer-transition',
		ucDrawerInner: 'uc-drawer-inner'
	},
	styles: {
		modal: {
			content: {
				style: {
					display: 'flex'
				},
				left: {
					style: {
						justifyContent: 'flex-start'
					}
				},
				right: {
					style: {
						justifyContent: 'flex-end'
					}
				},
				top: {
					style: {
						alignItems: 'flex-start'
					}
				},
				bottom: {
					style: {
						alignItems: 'flex-end'
					}
				}
			}
		},
		transition: {
			style: {
				pointerEvents: 'none',
				display: 'flex'
			}
		},
		inner: {
			elevation: 24,
			shape: 'default',
			style: {
				backgroundColor: 'white',
				display: 'flex',
				flexDirection: 'column',
				overflowX: 'hidden',
				overflowY: 'auto',
				pointerEvents: 'auto'
			},
			horizontal: {
				style: {
					width: '256px',
					height: '100%'
				}
			},
			vertical: {
				style: {
					width: '100%',
					height: '256px'
				}
			}
		}
	}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
