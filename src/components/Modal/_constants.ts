import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'Modal';

const constants = {
	names: {
		ucModal: 'uc-modal',
		ucModalContent: 'uc-modal-content',
		ucModalBackdrop: 'uc-modal-backdrop'
	},
	styles: {
		content: {
			style: {
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 1
			}
		},
		container: {
			style: {
				position: 'relative'
			}
		},
		modalZindex: $.zIndex.modal,
		backdropZindex: 0
	}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
