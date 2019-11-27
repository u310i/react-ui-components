import $ from "../_constants";
import { createComponentConstants, getComponentConstants } from "scripts";

const name = "sticky";

export const constants = {
  name: name,
  classNames: {
    name: `${$.prefix}${name}`,
    nameContents: `${$.prefix}${name}-contents`,
    nameAbsoluteWrapper: `${$.prefix}${name}-absolute-wrapper`,
    nameOuter: `${$.prefix}${name}-outer`,
    nameInner: `${$.prefix}${name}-inner`,
    nameDummy: `${$.prefix}${name}-dummy`
  },
  styles: {
    default: {
      style: {
        position: "static",
        transition: "none",
        zIndex: $.zIndex.sticky
      }
    },
    sticky: {
      style: {
        left: "auto",
        right: "auto"
      }
    },
    absolute: {
      style: {
        position: "absolute"
      }
    },
    fixed: {
      style: {
        position: "fixed"
      }
    },
    zIndex: $.zIndex.slide
  }
} as const;

declare global {
  namespace $Type {
    namespace Constants {
      namespace Components {
        type Sticky = typeof constants;
      }
    }
  }
}

createComponentConstants(name, constants);

export default getComponentConstants(name);
