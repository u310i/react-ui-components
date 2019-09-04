import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'slide';

export const constants = {
  name: name,
  names: {
    slide: `${$.prefix}${name}`,
  },
  styles: {
    style: {
      // alternative to "width: fit-content"
      display: 'table',
      position: 'relative',
    },
    duration: $.transition.duration,
    easing: {
      enter: $.cubicBeziers.easeOut,
      exit: $.cubicBeziers.easeOut,
    },
    direction: 'down',
    exitedVisibility: 'hidden',
    enteredTranslate: 'translate(0, 0)',
    gutter: 24,
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
