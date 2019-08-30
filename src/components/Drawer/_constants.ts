import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'drawer';

export const constants = {
  name: name as typeof name,
  names: {
    drawer: `${$.prefix}${name}`,
    drawerContainer: `${$.prefix}${name}-container`,
    drawerTransition: `${$.prefix}${name}-transition`,
    drawerInner: `${$.prefix}${name}-inner`,
  },
  styles: {
    modal: {
      content: {
        style: {
          display: 'flex',
        },
        left: {
          style: {
            justifyContent: 'flex-start',
          },
        },
        right: {
          style: {
            justifyContent: 'flex-end',
          },
        },
        top: {
          style: {
            alignItems: 'flex-start',
          },
        },
        bottom: {
          style: {
            alignItems: 'flex-end',
          },
        },
      },
    },
    transition: {
      style: {
        pointerEvents: 'none',
        display: 'flex',
      },
    },
    inner: {
      elevation: 16,
      shape: 'default',
      style: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        pointerEvents: 'auto',
      },
      horizontal: {
        style: {
          width: '256px',
          height: '100%',
        },
      },
      vertical: {
        style: {
          width: '100%',
          height: '256px',
        },
      },
    },
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
