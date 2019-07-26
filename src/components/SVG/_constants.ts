import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'svg';

const constants = {
  styles: {
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    role: 'img',
    pointerEvents: 'none',
    symbolDisplay: 'none'
  }
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
