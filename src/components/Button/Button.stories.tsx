import * as React from "react";
import { getPropTable } from "../../_storybook/scripts";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Button from "./Button";

const title = "Button";

export default {
  title: title,
  decorators: [
    (storyFn: any) => {
      return <div style={{ textAlign: "center" }}>{storyFn()}</div>;
    }
  ],
  parameters: {
    notes: {
      markdown: getPropTable(title)
    },
    info: {
      inline: true
    }
  }
};

console.log(
  "=================================================================="
);
console.log(JSON.stringify(Button.__docgenInfo, null, "  "));

console.log(
  "************************************************************************************"
);
console.log(JSON.stringify(window.STORYBOOK_REACT_CLASSES, null, "  "));

export const withText = () => (
  <div>
    <Button
      onClick={action("button-click")}
      disabled={boolean("disabled", false, "1")}
      style={object("style", { marginRight: "30px" }, "1")}
    >
      {text("Label", "Hello Storybook!", "1")}
    </Button>
    {/* <Button
      onClick={linkTo("Button", "with-emoji") as () => void}
      disabled={boolean("disabled", false, "2")}
      style={object("style", {}, "2")}
    >
      {text("Label", "Go to withEmoji", "2")}
    </Button> */}
  </div>
);

// export const withEmoji = () => (
//   <Button onClick={action("emoji-button-click")} disabled={false}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );
