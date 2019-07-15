import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'grow';

const $tSelectors = $.selectors.transition;

const constants = {
	names: {
		ucGrow: 'uc-grow'
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
		style: {
			// alternative to "width: fit-content"
			display: 'table',
			position: 'relative'
		},
		duration: $.props.transitionDuration,
		easing: $.props.transitionEasing,
		enteredOpacity: '1',
		exitedOpacity: '0',
		enteredScale: 'scale(1, 1) translateZ(0px)',
		scaleDurationRatio: 0.666,
		outScalingDelayRatioFromDuration: 0.333,
		scaleXRatio: 0.75,
		scaleYRatio: 0.6,
		exitedVisibility: 'hidden'
	}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
