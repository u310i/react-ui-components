import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'backdrop';

const $tSelectors = $.selectors.transition;

const constants = {
	names: {
		ucBackdrop: 'uc-backdrop',
		ucBackdropMain: 'uc-backdrop-main'
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
		main: {
			position: 'fixed',
			right: 0,
			bottom: 0,
			top: 0,
			left: 0,
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			// Remove grey highlight
			WebkitTapHighlightColor: 'transparent',
			// Disable scroll capabilities.
			touchAction: 'none'
		},
		invisible: {
			backgroundColor: 'transparent'
		},
		fadeComponent: {
			position: 'relative',
			zIndex: $.zIndex.backdrop
		}
	}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
