import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'swipeable_drawer';

const $tSelectors = $.selectors.transition;

const constants = {
	names: {
		ucSwipeable_drawer: 'uc-swipeable_drawer',
		ucSwipeable_drawerTransition: 'uc-swipeable_drawer-transition',
		ucSwipeable_drawerArea: 'uc-swipeable_drawer-area'
	},
	selectors: {},
	styles: {
		style: {},
		swipeArea: {
			style: {
				position: 'fixed',
				top: 0,
				left: 0,
				bottom: 0,
				zIndex: $.zIndex.drawer - 1
			},
			left: {
				style: {
					right: 'auto'
				}
			},
			right: {
				style: {
					left: 'auto',
					right: 0
				}
			},
			top: {
				style: {
					bottom: 'auto',
					right: 0
				}
			},
			bottom: {
				style: {
					top: 'auto',
					bottom: 0,
					right: 0
				}
			}
		},
		// duration: $.props.transitionDuration,
		duration: {
			enter: 225,
			exit: 195
		},
		easing: 'linear'
	}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
