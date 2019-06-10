import $ from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const name = 'backdrop';

const $tSelectors = $.selectors.transition;

const materials = {
	names: {
		ucFade: 'uc-backdrop'
	},
	selectors: {
		enters: $tSelectors.enters,
		enterings: $tSelectors.enterings,
		entered: $tSelectors.entered,
		exit: $tSelectors.exit,
		exiting: $tSelectors.exiting,
		exited: $tSelectors.exited
	},
	styles: {
		duration: $.props.transitionDuration,
		easing: $.props.transitionEasing,
		exitedOpacity: '0',
		enteredOpacity: '1',
		transitionProperty: 'opacity',
		exitedVisibility: 'hidden'
	}
};

createComponentMaterials(materials, name);

export default getComponentMaterials(name);
