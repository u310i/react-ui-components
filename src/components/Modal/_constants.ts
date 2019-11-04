import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'modal';

export const constants = {
  name: name,
  classNames: {
    modal: `${$.prefix}${name}`,
    modalContent: `${$.prefix}${name}-contents`,
    modalBackdrop: `${$.prefix}${name}-backdrop`,
  },
  styles: {
    container: {
      style: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    contents: {
      style: {
        position: 'fixed',
        width: '100%',
        height: '100%',
      },
    },
    modalZindex: $.zIndex.modal,
    backdropZindex: 0,
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
