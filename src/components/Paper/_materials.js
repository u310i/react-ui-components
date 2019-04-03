import $ from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const name = 'Paper';

const materials = {
  names: {
    ucPaper: 'uc-paper'
  },
  shadow: $.shadow,
  shape: $.shape,
  color: $.colors.white
};

createComponentMaterials(materials, name);

export default getComponentMaterials(name);
