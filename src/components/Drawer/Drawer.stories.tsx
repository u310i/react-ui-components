import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { wrapedLong } from "../../_storybook/dummyText";
import Drawer from "./Drawer";
import Button from "../Button/Button";
import BaseElement from "../BaseElement/BaseElement";
import { childrenHorizontalSpacing } from "../../_storybook/style";

export default {
  title: "Drawer",
  component: Drawer,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

export const basic = () => {
  const [left_state, left_setState] = React.useState(false);
  const left_handleClose = React.useCallback(() => {
    left_setState(false);
  }, []);
  const left_handleOpen = React.useCallback(() => {
    left_setState(true);
  }, []);

  const [top_state, top_setState] = React.useState(false);
  const top_handleClose = React.useCallback(() => {
    top_setState(false);
  }, []);
  const top_handleOpen = React.useCallback(() => {
    top_setState(true);
  }, []);

  const [right_state, right_setState] = React.useState(false);
  const right_handleClose = React.useCallback(() => {
    right_setState(false);
  }, []);
  const right_handleOpen = React.useCallback(() => {
    right_setState(true);
  }, []);

  const [bottom_state, bottom_setState] = React.useState(false);
  const bottom_handleClose = React.useCallback(() => {
    bottom_setState(false);
  }, []);
  const bottom_handleOpen = React.useCallback(() => {
    bottom_setState(true);
  }, []);

  const children = (
    <>
      <a href="#">anchor</a>
      <input type="text" />
      <div>{wrapedLong}</div>
    </>
  );

  return (
    <div>
      <BaseElement style={childrenHorizontalSpacing}>
        <Button onClick={left_handleOpen}>left</Button>
        <Button onClick={top_handleOpen}>top</Button>
        <Button onClick={right_handleOpen}>right</Button>
        <Button onClick={bottom_handleOpen}>bottom</Button>
      </BaseElement>

      <Drawer
        open={left_state}
        anchor="left"
        onEscapeKeyDown={left_handleClose}
        onOutsideClick={left_handleClose}
      >
        {children}
        <Button onClick={left_handleClose}>close</Button>
      </Drawer>

      <Drawer
        open={top_state}
        anchor="top"
        onEscapeKeyDown={top_handleClose}
        onOutsideClick={top_handleClose}
      >
        {children}
        <Button onClick={left_handleClose}>close</Button>
      </Drawer>

      <Drawer
        open={right_state}
        anchor="right"
        onEscapeKeyDown={right_handleClose}
        onOutsideClick={right_handleClose}
      >
        {children}
        <Button onClick={right_handleClose}>close</Button>
      </Drawer>
      <Drawer
        open={bottom_state}
        anchor="bottom"
        onEscapeKeyDown={bottom_handleClose}
        onOutsideClick={bottom_handleClose}
      >
        {children}
        <Button onClick={bottom_handleClose}>close</Button>
      </Drawer>
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
      <Drawer
        open={state}
        onEscapeKeyDown={handleClose}
        onOutsideClick={handleClose}
        keepMount={true}
      >
        <a href="#">anchor</a>
        <input type="text" />
        <div>{wrapedLong}</div>
        <Button onClick={handleClose}>close</Button>
      </Drawer>
    </div>
  );
};
