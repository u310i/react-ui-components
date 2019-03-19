import $ from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const name = 'zoom';

const $tSelectors = $.selectors.transition;

const materials = {
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

createComponentMaterials(materials, name);

export default getComponentMaterials(name);
