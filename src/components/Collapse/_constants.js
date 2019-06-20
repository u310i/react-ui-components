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
    height: 'auto',
    duration: $.props.transitionDuration,
    easing: $.props.transitionEasing,
    collapsedHeight: '0px',
    transitionProperty: 'height',
    overflow: 'hidden',
    inner: {
      display: 'flex'
    }
  }
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
