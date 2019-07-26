import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'Dialog';

const $tSelectors = $.selectors.transition;

const constants = {
	names: {
		ucDialog: 'uc-dialog',
		ucDialogContainer: 'uc-dialog-container',
		ucDialogTransition: 'uc-dialog-transition',
		ucDialogInner: 'uc-dialog-inner'
	},
	styles: {
		transition: {
			style: {
				pointerEvents: 'none',
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			},
			scrollBody: {
				style: {
					overflowX: 'hidden',
					overflowY: 'auto',
					alignItems: 'start'
				}
			}
		},
		inner: {
			elevation: 24,
			shape: 'default',
			style: {
				backgroundColor: 'white',
				maxHeight: 'calc(100% - 96px)',
				margin: '48px',
				width: '256px',
				display: 'flex',
				flexDirection: 'column',
				overflowX: 'hidden',
				overflowY: 'auto',
				pointerEvents: 'auto'
			},
			scrollBody: {
				style: {
					maxHeight: 'none'
					// alignItems: 'hidden'
				}
			},
			fullScreen: {
				style: {
					width: '100%',
					height: '100%',
					margin: '0',
					maxHeight: 'none'
				},
				shape: 'corner'
			}
		}
	}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
