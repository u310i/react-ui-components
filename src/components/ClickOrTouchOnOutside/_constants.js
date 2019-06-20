import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'ClickOrTouchOnOutside';

const $tSelectors = $.selectors.transition;

const constants = {
	names: {
		ucBackdrop: 'uc-ClickOrTouchOnOutside'
	},

	styles: {}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
