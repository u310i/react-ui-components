import $ from "../_constants";
import { createComponentConstants, getComponentConstants } from "scripts";

const name = "backdrop";

export const constants = {
  name: name as typeof name,
  classNames: {
    name: `${$.prefix}${name}`,
    nameInner: `${$.prefix}${name}-inner`
  },
  styles: {
    style: {
      position: "relative",
      zIndex: $.zIndex.backdrop
    },
    inner: {
      style: {
        position: "fixed",
        right: 0,
        bottom: 0,
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        // Remove grey highlight
        WebkitTapHighlightColor: "transparent",
        // Disable scroll capabilities.
        touchAction: "none"
      }
    },
    duration: $.transition.duration
  }
} as const;

declare global {
  namespace $Type {
    namespace Constants {
      namespace Components {
        type Backdrop = typeof constants;
      }
    }
  }
}

createComponentConstants(name, constants);

export default getComponentConstants(name);
