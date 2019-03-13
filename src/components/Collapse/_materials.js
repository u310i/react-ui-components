import origin from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const materials = {
  names: {
    ucCollapse: 'uc-collapse',
    ucCollapseInner: 'uc-collapse-inner'
  },
  styles: {
    defaultHeight: 'auto',
    defaultDuration: 300,
    defaultEasing: origin.cubicBeziers.easeInOut,
    collapsedHeight: '0px',
    main: {
      transitionProperty: 'height',
      overflow: 'hidden'
    },
    inner: {
      display: 'flex'
    }
  }
};

createComponentMaterials(materials, 'collapse');

export default getComponentMaterials('collapse');
