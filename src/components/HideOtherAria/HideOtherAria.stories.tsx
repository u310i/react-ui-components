import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import HideOtherAria from "./HideOtherAria";
import BaseElement from "../BaseElement/BaseElement";
import { childrenVerticalSpacing } from "../../_storybook/style";

export default {
  title: "HideOtherAria",
  component: HideOtherAria,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

export const basic = () => {
  const targetRef = React.useRef<null | Element>(null);
  const parentRef = React.useRef<null | Element>(null);

  const [activeState, setActive] = React.useState(false);
  const [parentState, setParent] = React.useState("body");

  return (
    <BaseElement style={childrenVerticalSpacing}>
      <button onClick={() => setActive(prev => !prev)}>active switch</button>
      <button
        onClick={() =>
          setParent(prev => (prev === "body" ? "wrapper" : "body"))
        }
      >
        parent switch
      </button>
      <HideOtherAria
        target={targetRef}
        parent={parentState === "body" ? document.body : parentRef}
        active={activeState}
      />
      <div>{activeState ? "active" : "not active"}</div>
      <BaseElement
        refer={parentRef}
        style={{
          ...childrenVerticalSpacing,
          border: "solid 1px",
          padding: "10px"
        }}
      >
        {parentState === "body" ? "parent is body" : "parent is this"}
        <BaseElement style={{ border: "solid 1px" }} refer={targetRef}>
          target (not aria-hidden)
        </BaseElement>
        <div style={{ border: "solid 1px" }}>
          aria-hidden = {activeState ? "true" : "false"}
        </div>
      </BaseElement>
    </BaseElement>
  );
};
