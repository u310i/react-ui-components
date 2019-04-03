import $ from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const name = 'Modal';

const materials = {
  names: {
    ucModalOuter: 'uc-modal-outer',
    ucModalInner: 'uc-modal-inner'
  }
};

createComponentMaterials(materials, name);

export default getComponentMaterials(name);
