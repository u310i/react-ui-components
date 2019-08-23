import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'slide';

const $easeOutCubicBeziers = $.cubicBeziers.easeOut;

const constants = {
  names: {
    ucSlide: 'uc-slide',
  },
  styles: {
    style: {
      // alternative to "width: fit-content"
      display: 'table',
      position: 'relative',
    },
    duration: $.transition.duration,
    easing: {
      enter: $easeOutCubicBeziers,
      exit: $easeOutCubicBeziers,
    },
    direction: 'down',
    exitedVisibility: 'hidden',
    enteredTranslate: 'translate(0, 0)',
    gutter: 24,
  },
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
