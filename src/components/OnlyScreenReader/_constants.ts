import $ from "../_constants";
import { createComponentConstants, getComponentConstants } from "scripts";

const name = "onlyScreenReader";

export const constants = {
  name: name,
  classNames: {
    name: `${$.prefix}${name}`
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
      whiteSpace: "nowrap"
    }
  }
} as const;

declare global {
  namespace $Type {
    namespace Constants {
      namespace Components {
        type OnlyScreenReader = typeof constants;
      }
    }
  }
}

createComponentConstants(name, constants);

export default getComponentConstants(name);
