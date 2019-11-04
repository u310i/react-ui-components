import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'sticky';

export const constants = {
  name: name,
  classNames: {
    sticky: `${$.prefix}${name}`,
    stickyContents: `${$.prefix}${name}-contents`,
    stickyAbsoluteWrapper: `${$.prefix}${name}-absolute-wrapper`,
    stickyOuter: `${$.prefix}${name}-outer`,
    stickyInner: `${$.prefix}${name}-inner`,
    stickyDummy: `${$.prefix}${name}-dummy`,
  },
  styles: {
    default: {
      style: {
        position: 'static',
        transition: 'none',
        zIndex: 800,
      }
    },
    sticky: {
      left: 'auto',
      right: 'auto',
    },
    absolute: {
      style: {
        position: 'absolute',
      }
    },
    fixed: {
      style: {
        position: 'fixed',
      }
    },
    zIndex: $.zIndex.slide,
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
