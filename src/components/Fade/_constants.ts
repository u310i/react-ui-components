import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'fade';

export const constants = {
  name: name,
  names: {
    fade: `${$.prefix}${name}`,
  },
  styles: {
    style: {
      // alternative to "width: fit-content"
      display: 'table',
      position: 'relative',
    },
    duration: $.transition.duration,
    easing: $.transition.easing,
    exitedOpacity: '0',
    enteredOpacity: '1',
    exitedVisibility: 'hidden',
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
