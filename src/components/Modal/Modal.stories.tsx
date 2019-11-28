import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Modal from "./Modal";
import Button from "../Button/Button";
import BaseElement from "../BaseElement/BaseElement";

export default {
  title: "Modal",
  component: Modal,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

export const Basic = () => {
  const [state, setState] = React.useState(false);
  const handleOpen = React.useCallback(() => {
    setState(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setState(false);
  }, []);

  return (
    <div>
      <Button onClick={handleOpen} style={{ zIndex: 10000 }}>
        open
      </Button>
      <Modal
        role="dialog"
        open={state}
        onEscapeKeyDown={handleClose}
        onOutsideClick={handleClose}
      >
        <BaseElement elementName="div" style={{ backgroundColor: "white" }}>
          top test test test test test test test test test test test test test
          test test test test test test test test test test test test test test
          test test test test test test test test test test test test test test
          test test test test test test test test test test test test test test
          test test test test test test test test test test test test bottom
          <Button onClick={handleClose}>handler1</Button>
        </BaseElement>
      </Modal>
    </div>
  );
};
