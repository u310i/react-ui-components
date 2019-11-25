import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'grow';

export const constants = {
  name: name,
  classNames: {
    name: `${$.prefix}${name}`,
  },
  styles: {
    style: {
      // alternative to "width: fit-content"
      display: 'table',
      position: 'relative',
    },
    duration: $.transition.duration,
    easing: $.transition.easing,
    enteredOpacity: '1',
    exitedOpacity: '0',
    enteredScale: 'scale(1, 1) translateZ(0px)',
    scaleDurationRatio: 0.666,
    outScalingDelayRatioFromDuration: 0.333,
    scaleXRatio: 0.75,
    scaleYRatio: 0.6,
    exitedVisibility: 'hidden',
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
