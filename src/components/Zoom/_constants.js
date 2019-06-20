import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'zoom';

const $tSelectors = $.selectors.transition;

const constants = {
  names: {
    ucSlide: 'uc-zoom'
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
    exitedScale: 'scale(0)',
    enteredScale: 'scale(1)',
    transitionProperty: 'transform',
    exitedVisibility: 'hidden'
  }
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
