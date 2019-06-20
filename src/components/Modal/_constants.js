import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'Modal';

const constants = {
	names: {
		ucModal: 'uc-modal',
		ucModalInner: 'uc-modal-inner'
	},
	styles: {
		main: {
			position: 'fixed',
			top: 0,
			left: 0,
			zIndex: $.zIndex.modal
		}
	}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
