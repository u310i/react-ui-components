import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
  decorators: [
    (storyFn: any) => {
      return <div style={{ textAlign: "center" }}>{storyFn()}</div>;
    }
  ],
  parameters: {
    componentSubtitle: "Sub Title"
    // notes: {
    //   markdown: getPropTable(title)
    // }
    // info: {
    //   // inline: true
    // }
  }
};

// declare global {
//   interface Window {
//     STORYBOOK_REACT_CLASSES: any;
//   }
// }

// console.log(
//   "=================================================================="
// );
// console.log(JSON.stringify((Button as any).__docgenInfo, null, "  "));

// console.log(
//   "************************************************************************************"
// );
// console.log(
//   JSON.stringify((window as any).STORYBOOK_REACT_CLASSES, null, "  ")
// );
// console.log(JSON.stringify(window.STORYBOOK_REACT_CLASSES, null, "  "));
// console.log("Button");

export const Basic = () => (
  <div>
    <Button
      onClick={action("button-click")}
      disabled={boolean("disabled", false, "1")}
      style={object("style", { marginRight: "30px" }, "1")}
    >
      {text("Label", "Hello Storybook!", "1")}
    </Button>
  </div>
);

export const withEmoji = () => (
  <div>
    <Button onClick={action("emoji-button-click")} disabled={false}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  </div>
);
