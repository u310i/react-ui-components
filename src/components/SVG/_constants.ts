import $ from "../_constants";
import { createComponentConstants, getComponentConstants } from "scripts";

const name = "svg";

export const constants = {
  name: name,
  classNames: {
    name: `${$.prefix}${name}`,
    nameSymbol: `${$.prefix}${name}-symbol`,
    nameUse: `${$.prefix}${name}-use`,
    nameInner: `${$.prefix}${name}-inner`,
    nameTransformGroupOuter: `${$.prefix}${name}-transform-group-outer`,
    nameTransformGroupInner: `${$.prefix}${name}-transform-group-inner`
  },
  styles: {
    style: {
      pointerEvents: "none"
    },
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    role: "img",
    symbolDisplay: "none"
  }
} as const;

declare global {
  namespace $Type {
    namespace Constants {
      namespace Components {
        type SVG = typeof constants;
      }
    }
  }
}

createComponentConstants(name, constants);

export default getComponentConstants(name);
