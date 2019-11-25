import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'swipeableDrawer';

export const constants = {
  name: name,
  classNames: {
    name: `${$.prefix}${name}`,
    nameTransition: `${$.prefix}${name}-transition`,
    nameArea: `${$.prefix}${name}-area`,
  },
  selectors: {},
  styles: {
    style: {},
    swipeArea: {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: $.zIndex.drawer - 1,
      },
      anchor: {
        left: {
          style: {
            right: 'auto',
          },
        },
        right: {
          style: {
            left: 'auto',
            right: 0,
          },
        },
        top: {
          style: {
            bottom: 'auto',
            right: 0,
          },
        },
        bottom: {
          style: {
            top: 'auto',
            bottom: 0,
            right: 0,
          },
        },
      }
    },
    // duration: $.transition.duration,
    duration: {
      enter: 195,
      exit: 225,
    },
    easing: $.cubicBeziers.easeInOut,
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
