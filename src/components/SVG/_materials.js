import origin from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const materials = {
  styles: {
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    role: 'img',
    pointerEvents: 'none',
    symbolDisplay: 'none'
  }
};

createComponentMaterials(materials, 'svg');

export default getComponentMaterials('svg');
