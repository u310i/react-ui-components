import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'modal';

export const constants = {
  name: name,
  classNames: {
    modal: `${$.prefix}${name}`,
    modalContent: `${$.prefix}${name}-content`,
    modalBackdrop: `${$.prefix}${name}-backdrop`,
  },
  styles: {
    content: {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      },
    },
    container: {
      style: {
        position: 'relative',
      },
    },
    modalZindex: $.zIndex.modal,
    backdropZindex: 0,
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
