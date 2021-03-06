import $ from "../_constants";
import { createComponentConstants, getComponentConstants } from "scripts";

const name = "icon";

export const constants = {
  name: name,
  styles: {
    defaultIcon: ["sys", "envelope"],
    prefix: $.prefix,
    style: {
      display: "inline-block",
      overflow: "visible",
      height: "1em",
      fontSize: "inherit",
      verticalAlign: "-.125em"
    },
    symbolDisplay: "none",
    marginLeft: "0.5em",
    marginRight: "0.5em",
    currentColor: "currentColor",
    height: 1,
    heightIfBorder: 1.5,
    widthRatioIfFixed: 1.25,
    precision: 3,
    border: {
      border: "solid 0.08em #eee",
      borderRadius: "0.1em",
      padding: "0.2em 0.25em 0.15em"
    },
    pullLeft: {
      marginRight: "0.3em",
      float: "left"
    },
    pullRight: {
      marginLeft: "0.3em",
      float: "right"
    },
    flipHorizontal: "scale(-1, 1)",
    flipVertical: "scale(1, -1)",
    flipBoth: "scale(-1, -1)",
    roll: {
      from: {
        transform: "rotate(0deg)"
      },
      to: {
        transform: "rotate(360deg)"
      },
      spin: "1s infinite linear",
      pulse: "1s infinite steps(8)"
    }
  }
} as const;

declare global {
  namespace $Type {
    namespace Constants {
      namespace Components {
        type Icon = typeof constants;
      }
    }
  }
}

createComponentConstants(name, constants);

export default getComponentConstants(name);
