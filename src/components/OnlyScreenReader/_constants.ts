import $ from '../_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'onlyScreenReader';

export const constants = {
  name: name,
  names: {
    onlyScreenReader: `${$.prefix}${name}`,
  },
  styles: {
    style: {
      border: 0,
      clip: "rect(0 0 0 0)",
      clipPath: "polygon(0px 0px, 0px 0px, 0px 0px)",
      "-webkit-clip-path": "polygon(0px 0px, 0px 0px, 0px 0px)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: "1px",
      whiteSpace: "nowrap",
    },
  },
} as const;

createComponentConstants(name, constants);

export default getComponentConstants(name);
