import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'dialog';

export const constants = {
  name: name as typeof name,
  names: {
    dialog: `${$.prefix}${name}`,
    dialogContainer: `${$.prefix}${name}-container`,
    dialogTransition: `${$.prefix}${name}-transition`,
    dialogInner: `${$.prefix}${name}-inner`,
  },
  styles: {
    transition: {
      style: {
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      scrollBody: {
        style: {
          overflowX: 'hidden',
          overflowY: 'auto',
          alignItems: 'start',
        },
      },
    },
    inner: {
      elevation: 24,
      shape: 'default',
      style: {
        backgroundColor: 'white',
        maxHeight: 'calc(100% - 96px)',
        margin: '48px',
        width: '256px',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        pointerEvents: 'auto',
      },
      scrollBody: {
        style: {
          maxHeight: 'none',
          // alignItems: 'hidden'
        },
      },
      fullScreen: {
        style: {
          width: '100%',
          height: '100%',
          margin: '0',
          maxHeight: 'none',
        },
        shape: 'corner',
      },
    },
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
