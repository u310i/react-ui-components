import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import ClickOutside from "./ClickOutside";

export default {
  title: "ClickOutside",
  component: ClickOutside,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

export const Basic = () => {
  const ref = React.useRef<null | Node>(null);

  return (
    <div>
      <ClickOutside target={ref.current} action={action("button-click")} />
      <div style={{ padding: "100px" }} ref={ref as any}>
        dummy
      </div>
    </div>
  );
};
