import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'slide';

const $tSelectors = $.selectors.transition;
const $easeOutCubicBeziers = $.cubicBeziers.easeOut;

const constants = {
  names: {
    ucSlide: 'uc-slide'
  },
  selectors: {
    exited: $tSelectors.exited
  },
  styles: {
    duration: $.props.transitionDuration,
    easing: {
      enter: $easeOutCubicBeziers,
      exit: $easeOutCubicBeziers
    },
    transitionProperty: 'transform',
    direction: 'down',
    exitedVisibility: 'hidden',
    enteredTranslate: 'translate(0, 0)'
  }
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
