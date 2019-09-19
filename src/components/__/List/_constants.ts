import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'list';

export const constants = {
  name: name as typeof name,
  classNames: {
    list: `${$.prefix}${name}`,
    listGroup: `${$.prefix}${name}-group`,
  },
  selectors: {
    divFirstChild: '& > div:first-child',
    ulSecondChild: '& > ul:nth-child(2)',
    nthChild: $.selectors.nested.nthChild,
  },
  styles: {
    list: {
      width: '256px',
    },
    group: {
      title: {
        display: 'flex',
        alignItems: 'center',
        height: '3em',
        // paddingLeft: '1em'
      },
    },
    item: {
      main: {
        display: 'flex',
        alignItems: 'center',
        height: '3em',
        // paddingLeft: '1em'
      },
    },
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
