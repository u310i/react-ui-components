import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'list';

const constants = {
  names: {
    ucList: 'uc-list',
    ucListGroup: 'uc-list-group'
  },
  selectors: {
    divFirstChild: '& > div:first-child',
    ulSecondChild: '& > ul:nth-child(2)',
    nthChild: $.selectors.nested.nthChild
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
      main: {
        display: 'flex',
        alignItems: 'center',
        height: '3em'
        // paddingLeft: '1em'
      }
    }
  }
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
