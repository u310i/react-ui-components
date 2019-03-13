import origin from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const materials = {
  names: {
    ucList: 'uc-list',
    ucListGroup: 'uc-list-group'
  },
  selectors: {
    divFirstChild: '& > div:first-child',
    ulSecondChild: '& > ul:nth-child(2)',
    nthChild: origin.selectors.nested.nthChild
  },
  styles: {
    list: {
      width: '256px'
    },
    group: {
      title: {
        display: 'flex',
        alignItems: 'center',
        height: '3em'
        // paddingLeft: '1em'
      }
    },
    item: {
      solid: {
        display: 'flex',
        alignItems: 'center',
        height: '3em'
        // paddingLeft: '1em'
      }
    }
  }
};

createComponentMaterials(materials, 'list');

export default getComponentMaterials('list');
