import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Dialog from "./Dialog";
import Button from "../Button/Button";
import Slide from "../Slide/Slide";
import notes from "./notes.md";

export default {
  title: "Dialog",
  parameters: {
    notes: "",
    info: {
      inline: true
    }
  }
};

export const basic = () => {
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
        <Button onClick={handleClose}>
          <span role="img" aria-label="so cool">
            close
          </span>
        </Button>
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
