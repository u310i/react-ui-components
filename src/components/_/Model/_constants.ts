import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'Drawer';

const constants = {
  names: {
    drawerOuter: 'uc-drawer-outer',
    drawerInner: 'uc-drawer-inner'
  }
};

createComponentConstants(name, constants);

export default getComponentConstants(name);
