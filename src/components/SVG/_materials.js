import { createComponentMaterials, getComponentMaterials } from 'scripts';

const name = 'svg';

const materials = {
  styles: {
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    role: 'img',
    pointerEvents: 'none',
    symbolDisplay: 'none'
  }
};

createComponentMaterials(materials, name);

export default getComponentMaterials(name);
