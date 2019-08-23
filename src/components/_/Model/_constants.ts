import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'Drawer';

const constants = {
  names: {
    ucDrawerOuter: 'uc-drawer-outer',
    ucDrawerInner: 'uc-drawer-inner'
  }
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
