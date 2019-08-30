import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'sticky';

export const constants = {
  name: name as typeof name,
  names: {
    stickyAbsoluteWrapper: `${$.prefix}${name}-absolute-wrapper`,
    stickyOuter: `${$.prefix}${name}-outer`,
    stickyInner: `${$.prefix}${name}-inner`,
  },
  style: {
    zIndex: $.zIndex.slide,
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
