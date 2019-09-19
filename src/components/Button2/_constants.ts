import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'button2';

export const constants = {
  name: name,
  classNames: {
    button2: `${$.prefix}${name}`,
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
