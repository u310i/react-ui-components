import $ from "../_constants";
import { createComponentConstants, getComponentConstants } from "scripts";

const name = "paper";

export const constants = {
  name: name,
  classNames: {
    name: `${$.prefix}${name}`
  },
  styles: {
    style: {
      padding: "16px 24px"
    }
  },
  shadow: $.shadow,
  shape: $.shape,
  color: $.colors.white
} as const;

declare global {
  namespace $Type {
    namespace Constants {
      namespace Components {
        type Paper = typeof constants;
      }
    }
  }
}

createComponentConstants(name, constants);

export default getComponentConstants(name);
