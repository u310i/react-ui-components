import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'svg';

export const constants = {
  name: name,
  classNames: {
    svg: `${$.prefix}${name}`,
    svgSymbol: `${$.prefix}${name}-symbol`,
    svgUse: `${$.prefix}${name}-use`,
    svgInner: `${$.prefix}${name}-inner`,
    svgTransformGroupOuter: `${$.prefix}${name}-transform-group-outer`,
    svgTransformGroupInner: `${$.prefix}${name}-transform-group-inner`,
  },
  styles: {
    style: {
      pointerEvents: 'none',
    },
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    role: 'img',
    symbolDisplay: 'none',
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
