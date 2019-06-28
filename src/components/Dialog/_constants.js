import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'Dialog';

const $tSelectors = $.selectors.transition;

const constants = {
	names: {
		ucFade: 'uc-Dialog'
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

createComponentConstants(constants, name);

export default getComponentConstants(name);
