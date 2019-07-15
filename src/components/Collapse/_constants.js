import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'collapse';

const $tSelectors = $.selectors.transition;

const constants = {
	names: {
		ucCollapse: 'uc-collapse',
		ucCollapseInner: 'uc-collapse-inner'
	},
	selectors: {
		enters: $tSelectors.enters,
		exit: $tSelectors.exit
	},
	styles: {
		duration: $.props.transitionDuration,
		easing: $.props.transitionEasing,
		enteredHeight: 'auto',
		collapsedHeight: '0px',
		outer: {
			style: {
				position: 'relative'
			}
		},
		inner: {
			style: {
				// alternative to "width: fit-content"
				display: 'table'
			}
		}
	}
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
