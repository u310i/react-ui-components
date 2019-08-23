import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'zoom';

const constants = {
  names: {
    ucZoom: 'uc-zoom',
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
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
