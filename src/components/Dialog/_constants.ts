import $ from "../_constants";
import { createComponentConstants, getComponentConstants } from "scripts";

const name = "dialog";

export const constants = {
  name: name,
  classNames: {
    name: `${$.prefix}${name}`,
    nameContainer: `${$.prefix}${name}-container`,
    nameTransition: `${$.prefix}${name}-transition`,
    nameInner: `${$.prefix}${name}-inner`
  },
  styles: {
    modal: {
      contents: {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
        scrollBody: {
          style: {
            overflowX: "hidden",
            overflowY: "auto",
            alignItems: "start"
          }
        }
      }
    },
    transition: {
      style: {},
      scrollBody: {
        style: {
          margin: "48px"
        }
      }
    },
    inner: {
      elevation: 24,
      shape: "default",
      style: {
        backgroundColor: "white",
        maxHeight: "calc(100vh - 96px)",
        width: "256px",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        overflowY: "auto"
      },
      scrollBody: {
        style: {
          maxHeight: "none"
        }
      },
      fullScreen: {
        style: {
          width: "100%",
          height: "100vh",
          margin: "0",
          maxHeight: "none"
        },
        shape: "corner"
      }
    }
  }
} as const;

declare global {
  namespace $Type {
    namespace Constants {
      namespace Components {
        type Dialog = typeof constants;
      }
    }
  }
}

createComponentConstants(name, constants);

export default getComponentConstants(name);
