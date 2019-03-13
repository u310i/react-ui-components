import origin from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const materials = {
  names: {
    ucFade: 'uc-fade'
  },
  styles: {
    exitedOpacity: '0',
    enteredOpacity: '1',
    defaultDuration: 300,
    defaultEasing: origin.cubicBeziers.easeInOutEndSlowly,
    transitionProperty: 'opacity',
    exitedVisibility: 'hidden'
  }
};

createComponentMaterials(materials, 'fade');

export default getComponentMaterials('fade');
