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
		inner: {
			elevation: 24,
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
				maxHeight: 'none'
				// alignItems: 'hidden'
			},
			fullScreen: {
				width: '100%',
				height: '100%',
				margin: '0',
				maxHeight: 'none'
			}
		},
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
				overflowX: 'hidden',
				overflowY: 'auto',
				alignItems: 'start'
			}
		}
	}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
