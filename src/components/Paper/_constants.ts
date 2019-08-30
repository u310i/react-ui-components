import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'paper';

export const constants = {
  name: name as typeof name,
  names: {
    paper: `${$.prefix}${name}`,
  },
  styles: {
    style: {
      padding: '16px 24px',
    },
  },
  shadow: $.shadow,
  shape: $.shape,
  color: $.colors.white,
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
