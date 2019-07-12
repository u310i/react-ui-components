import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'Paper';

const constants = {
	names: {
		ucPaper: 'uc-paper'
	},
	styles: {
		style: {
			padding: '16px 24px'
		}
	},
	shadow: $.shadow,
	shape: $.shape,
	color: $.colors.white
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
