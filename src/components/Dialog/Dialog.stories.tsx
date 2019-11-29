import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Dialog from "./Dialog";
import Button from "../Button/Button";
import Slide from "../Slide/Slide";

export default {
  title: "Dialog",
  component: Dialog,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

export const Basic = () => {
  const [state, setState] = React.useState(false);
  const handleClose = React.useCallback(() => {
    setState(false);
  }, []);
  const handleOpen = React.useCallback(() => {
    setState(true);
  }, []);

  return (
    <div>
      <Button style={{ margin: "0.5em" }} onClick={handleOpen}>
        handler
      </Button>
      <Dialog
        open={state}
        onEscapeKeyDown={handleClose}
        onOutsideClick={handleClose}
        scrollBody={false}
        fullScreen={false}
        TransitionComponent={Slide}
        keepMount={true}
        transitionProps={{ duration: 300, direction: "left" }}
      >
        <a href="#">Another focusable thing</a>
        <input type="text" />
        <div>
          top test test test test test test test test test test test test test
          test test test test test test test test test test test test test test
          test test test test test test test test test test test test test test
          test test test test test test test test test test test test test test
          test test test test test test test test test test test test bottom
        </div>
        <Button onClick={handleClose}>handler1</Button>
      </Dialog>
    </div>
  );
};

export const withSlide = () => {
  const [state, setState] = React.useState(false);
  const handleClose = React.useCallback(() => {
    setState(false);
  }, []);
  const handleOpen = React.useCallback(() => {
    setState(true);
  }, []);
  return (
    <div>
      <Button onClick={handleOpen}>open</Button>
      <Dialog
        open={state}
        onEscapeKeyDown={handleClose}
        onOutsideClick={handleClose}
        scrollBody={false}
        fullScreen={false}
        TransitionComponent={Slide}
        keepMount={true}
        transitionProps={{ duration: 300, direction: "left" }}
      >
        <a href="#">focusable thing</a>
        <input type="text" />
        <div>
          top test test test test test test test test test test test test test
          test test test test test test test test test test test test test test
          test test test test test test test test test test test test test test
          test test test test test test test test test test test test test test
          test test test test test test test test test test test test bottom
        </div>
        <Button onClick={handleClose} disabled={false}>
          <span role="img" aria-label="so cool">
            close
          </span>
        </Button>
      </Dialog>
    </div>
  );
};
