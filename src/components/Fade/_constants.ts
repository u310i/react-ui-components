import $ from "../_constants";
import { createComponentConstants, getComponentConstants } from "scripts";

const name = "fade";

export const constants = {
  name: name,
  classNames: {
    name: `${$.prefix}${name}`
  },
  styles: {
    style: {
      // alternative to "width: fit-content"
      display: "table",
      position: "relative"
    },
    duration: $.transition.duration,
    easing: $.transition.easing,
    exitedOpacity: "0",
    enteredOpacity: "1",
    exitedVisibility: "hidden"
  }
} as const;

declare global {
  namespace $Type {
    namespace Constants {
      namespace Components {
        type Fade = typeof constants;
      }
    }
  }
}

createComponentConstants(name, constants);

export default getComponentConstants(name);
