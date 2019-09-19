import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'collapse';

export const constants = {
  name: name,
  classNames: {
    collapse: `${$.prefix}${name}`,
    collapseInner: `${$.prefix}${name}-inner`,
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
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
