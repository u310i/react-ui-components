import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'click';

const $tSelectors = $.selectors.transition;

const constants = {
	names: {
		ucBackdrop: 'uc-click'
	},

	styles: {}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
