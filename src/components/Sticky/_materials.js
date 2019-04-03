import $ from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const name = 'Sticky';

const materials = {
	names: {
		ucSlideAbsoluteWrapper: 'uc-sticky-absolute-wrapper',
		ucSlideOuter: 'uc-sticky-outer',
		ucSlideInner: 'uc-sticky-inner'
	},
	style: {
		zIndex: $.zIndex.slide
	}
};

createComponentMaterials(materials, name);

export default getComponentMaterials(name);
