import $ from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const name = 'grow';

const $tSelectors = $.selectors.transition;

const materials = {
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
    duration: $.props.transitionDuration,
    easing: $.props.transitionEasing,
    transitionOpacity: 'opacity',
    transitionTransform: 'transform',
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

createComponentMaterials(materials, name);

export default getComponentMaterials(name);
