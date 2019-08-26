import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'svg';

const constants = {
  names: {
    ucSVG: 'uc-svg',
    ucSVGSymbol: 'uc-svg-symbol',
    ucSVGUse: 'uc-svg-use',
    ucSVGInner: 'uc-svg-inner',
    ucSVGTransformGroupOuter: 'uc-svg-transform-group-outer',
    ucSVGTransformGroupInner: 'uc-svg-transform-group-inner',
  },
  styles: {
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    role: 'img',
    pointerEvents: 'none',
    symbolDisplay: 'none',
  },
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
