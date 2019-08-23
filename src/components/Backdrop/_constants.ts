import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'backdrop';

const constants = {
  names: {
    ucBackdrop: 'uc-backdrop',
    ucBackdropInner: 'uc-backdrop-inner',
  },
  styles: {
    style: {
      position: 'fixed',
      right: 0,
      bottom: 0,
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      // Disable scroll capabilities.
      touchAction: 'none',
    },
    duration: $.transition.duration,
    invisible: {
      style: {
        backgroundColor: 'transparent',
      },
    },
    transition: {
      style: {
        position: 'relative',
        zIndex: $.zIndex.backdrop,
      },
    },
    disablePointerEvents: {
      style: {
        pointerEvents: 'none',
      },
    },
  },
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
