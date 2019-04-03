import $ from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const name = 'Drawer';

const materials = {
  names: {
    ucDrawerOuter: 'uc-drawer-outer',
    ucDrawerInner: 'uc-drawer-inner'
  }
};

createComponentMaterials(materials, name);

export default getComponentMaterials(name);
