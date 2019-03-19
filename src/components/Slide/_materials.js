import $ from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const name = 'slide';

const $tSelectors = $.selectors.transition;
const $easeOutCubicBeziers = $.cubicBeziers.easeOut;

const materials = {
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

createComponentMaterials(materials, name);

export default getComponentMaterials(name);
