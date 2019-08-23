import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'fade';

const constants = {
  names: {
    ucFade: 'uc-fade',
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
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
