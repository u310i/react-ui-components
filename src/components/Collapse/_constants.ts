import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'collapse';

const constants = {
  names: {
    ucCollapse: 'uc-collapse',
    ucCollapseInner: 'uc-collapse-inner',
  },
  styles: {
    duration: $.transition.duration,
    easing: $.transition.easing,
    enteredHeight: 'auto',
    collapsedHeight: '0px',
    outer: {
      style: {
        position: 'relative',
      },
    },
    inner: {
      style: {
        // alternative to "width: fit-content"
        display: 'table',
      },
    },
  },
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
