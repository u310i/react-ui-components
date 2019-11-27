import $ from "../_constants";
import { createComponentConstants, getComponentConstants } from "scripts";

const name = "modal";

export const constants = {
  name: name,
  classNames: {
    name: `${$.prefix}${name}`,
    nameContent: `${$.prefix}${name}-contents`,
    nameBackdrop: `${$.prefix}${name}-backdrop`
  },
  styles: {
    container: {
      style: {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    },
    contents: {
      style: {
        position: "fixed",
        width: "100%",
        height: "100%"
      }
    },
    modalZindex: $.zIndex.modal,
    backdropZindex: 0
  }
} as const;

declare global {
  namespace $Type {
    namespace Constants {
      namespace Components {
        type Modal = typeof constants;
      }
    }
  }
}

createComponentConstants(name, constants);

export default getComponentConstants(name);
