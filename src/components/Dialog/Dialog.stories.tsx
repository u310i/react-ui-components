import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { wrapedLong } from "../../_storybook/dummyText";
import Dialog from "./Dialog";
import Button from "../Button/Button";
import Slide from "../Slide/Slide";
import Drawer from "../Drawer/Drawer";

export default {
  title: "Dialog",
  component: Dialog,
  parameters: {
    componentSubtitle: "Sub Title"
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
      >
        <a href="#">anchor</a>
        <input type="text" />
        <div>{wrapedLong}</div>
        <Button onClick={handleClose}>close</Button>
      </Dialog>
    </div>
  );
};

export const slide = () => {
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
        TransitionComponent={Slide}
      >
        <a href="#">focusable thing</a>
        <input type="text" />
        <div>{wrapedLong}</div>
        <Button onClick={handleClose} disabled={false}>
          <span role="img" aria-label="so cool">
            close
          </span>
        </Button>
      </Dialog>
    </div>
  );
};

export const scrollBody = () => {
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
        scrollBody={true}
      >
        <a href="#">focusable thing</a>
        <input type="text" />
        <div>{wrapedLong}</div>
        <Button onClick={handleClose} disabled={false}>
          <span role="img" aria-label="so cool">
            close
          </span>
        </Button>
      </Dialog>
    </div>
  );
};

export const fullScreen = () => {
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
      <Dialog open={state} onEscapeKeyDown={handleClose} fullScreen={true}>
        <a href="#">focusable thing</a>
        <input type="text" />
        <div>{wrapedLong}</div>
        <Button onClick={handleClose} disabled={false}>
          <span role="img" aria-label="so cool">
            close
          </span>
        </Button>
      </Dialog>
    </div>
  );
};

export const keepMount = () => {
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
        keepMount={true}
      >
        <a href="#">anchor</a>
        <input type="text" />
        <div>{wrapedLong}</div>
        <Button onClick={handleClose}>close</Button>
      </Dialog>
    </div>
  );
};

export const multiple = () => {
  const [a_state, a_setState] = React.useState(false);
  const a_handleClose = React.useCallback(() => {
    a_setState(false);
  }, []);
  const a_handleOpen = React.useCallback(() => {
    a_setState(true);
  }, []);
  const a_handleToggle = React.useCallback(() => {
    a_setState(prev => !prev);
  }, []);
  const [b_state, b_setState] = React.useState(false);
  const b_handleClose = React.useCallback(() => {
    b_setState(false);
  }, []);
  const b_handleOpen = React.useCallback(() => {
    b_setState(true);
  }, []);
  const b_handleToggle = React.useCallback(() => {
    b_setState(prev => !prev);
  }, []);
  const [c_state, c_setState] = React.useState(false);
  const c_handleClose = React.useCallback(() => {
    c_setState(false);
  }, []);
  const c_handleOpen = React.useCallback(() => {
    c_setState(true);
  }, []);

  return (
    <div>
      <Button onClick={a_handleOpen}>open</Button>
      <Dialog
        open={a_state}
        onEscapeKeyDown={a_handleClose}
        onOutsideClick={a_handleClose}
      >
        Dialog1
        <Button onClick={b_handleToggle}>toggle Dialog 2</Button>
      </Dialog>
      <Dialog
        open={b_state}
        onEscapeKeyDown={b_handleClose}
        onOutsideClick={b_handleClose}
        TransitionComponent={Slide}
        positionX={100}
        positionY={100}
        innerProps={{
          style: {
            backgroundColor: "LightPink"
          }
        }}
      >
        Dialog2
        <Button onClick={c_handleOpen} style={{ backgroundColor: "Tomato" }}>
          open Drawer
        </Button>
        <Button onClick={a_handleToggle} style={{ marginTop: "15px" }}>
          toggle Dialog1
        </Button>
      </Dialog>
      <Drawer
        open={c_state}
        onEscapeKeyDown={c_handleClose}
        onOutsideClick={c_handleClose}
        innerProps={{
          style: {
            backgroundColor: "Tomato"
          }
        }}
      >
        Drawer
        <Button onClick={c_handleClose}>close</Button>
      </Drawer>
    </div>
  );
};
