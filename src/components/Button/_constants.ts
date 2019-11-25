import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'button';

const $colors = $.colors;

export const constants = {
  name: name,
  classNames: {
    name: `${$.prefix}${name}`,
  },
  styles: {
    style: {
      display: 'inline-flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      verticalAlign: 'middle',
      padding: '0 1em',
      fontSize: '1em',
      height: '2em',
      touchAction: 'manipulation',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      transition: `all .15s ${$.cubicBeziers.easeInOut}`,
      color: $colors.white,
      backgroundColor: $colors.main,
      // borderColor: 'rgba(0,0,0,0)',
      borderRadius: $.shape.default,
      borderStyle: 'none',
      // borderWidth: '1px',
      [$.selectors.hover]: {
        backgroundColor: 'rgba(0,109,220,1)',
        // borderColor: 'rgba(0,109,220,1)',

      },
      [$.selectors.focus]: {
        backgroundColor: 'rgba(0,109,220,1)',
        // borderColor: 'rgba(0,109,220,1)',
      },
      [$.selectors.active]: {
        backgroundColor: 'rgb(0, 94, 189)',
        // borderColor: 'rgb(0, 94, 189)',

      }
    },
    disabled: {
      style: {
        opacity: 0.4,
        cursor: 'auto',
        [$.selectors.hover]: {},
        [$.selectors.focus]: {},
        [$.selectors.active]: {}
      },
    }
  }
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
