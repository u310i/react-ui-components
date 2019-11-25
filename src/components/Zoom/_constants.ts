import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'zoom';

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
    exitedScale: 'scale(0)',
    enteredScale: 'scale(1)',
    exitedVisibility: 'hidden',
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
