import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Backdrop from "./Backdrop";
import Button from "../Button/Button";

export default {
  title: "Backdrop",
  component: Backdrop,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

export const basic = () => {
  const [state, setState] = React.useState(false);
  const handleSwitch = React.useCallback(() => {
    setState(prev => !prev);
  }, []);

  return (
    <div>
      <Button onClick={handleSwitch} style={{ zIndex: 10000 }}>
        open
      </Button>
      <Backdrop open={state} />
    </div>
  );
};
