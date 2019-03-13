import origin from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const materials = {
  names: {
    ucGrow: 'uc-grow'
  },
  styles: {
    exitedOpacity: '0',
    enteredOpacity: '1',
    defaultDuration: 300,
    defaultEasing: origin.cubicBeziers.easeInOutEndSlowly,
    transitionOpacity: 'opacity',
    transitionTransform: 'transform',
    scaleDurationRatio: 0.666,
    outScalingDelayRatioFromDuration: 0.333,
    scaleXRatio: 0.75,
    scaleYRatio: 0.6,
    exitedScale: 'scale(1, 1) translateZ(0px)',
    exitedVisibility: 'hidden'
  }
};

createComponentMaterials(materials, 'grow');

export default getComponentMaterials('grow');
