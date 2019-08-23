import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'Sticky';

const constants = {
	names: {
		ucSlideAbsoluteWrapper: 'uc-sticky-absolute-wrapper',
		ucSlideOuter: 'uc-sticky-outer',
		ucSlideInner: 'uc-sticky-inner'
	},
	style: {
		zIndex: $.zIndex.slide
	}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
