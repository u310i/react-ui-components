import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import ClickOutside from "./ClickOutside";
import BaseElement from "../BaseElement/BaseElement";
import { childrenHorizontalSpacing } from "../../_storybook/style";

export default {
  title: "ClickOutside",
  component: ClickOutside,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

export const basic = () => {
  const [state, setState] = React.useState(0);
  const [targetState, setTarget] = React.useState("ref1");
  const [ignoreTargetState, setIgnoreTarget] = React.useState(false);
  const ref1 = React.useRef<null | HTMLDivElement>(null);
  const ref2 = React.useRef<null | HTMLDivElement>(null);

  return (
    <div
      style={{
        height: "300px",
        overflowY: "scroll"
      }}
    >
      <div
        style={{
          height: "1000px"
        }}
      >
        <ClickOutside
          target={targetState === "ref1" ? ref1 : ref2}
          action={() => setState(prev => ++prev)}
          ignoreTarget={ignoreTargetState}
        />
        <BaseElement style={childrenHorizontalSpacing}>
          <button
            onClick={() =>
              setTarget(prev => (prev === "ref1" ? "ref2" : "ref1"))
            }
          >
            change target
          </button>
          <button onClick={() => setIgnoreTarget(prev => !prev)}>
            change ignore target
          </button>
        </BaseElement>
        <div>{state}</div>
        <div style={{ padding: "15px", border: "solid 1px" }} ref={ref1}>
          <div style={{ border: "solid 1px" }}>
            {targetState === "ref1" ? "Nothing happens" : "count"}
          </div>
          {targetState === "ref1"
            ? (ignoreTargetState ? "count" : "Nothing happens") + " (target)"
            : "count"}{" "}
        </div>
        <div style={{ padding: "15px", border: "solid 1px" }} ref={ref2}>
          <div style={{ border: "solid 1px" }}>
            {targetState === "ref2" ? "Nothing happens" : "count"}
          </div>
          {targetState === "ref2"
            ? (ignoreTargetState ? "count" : "Nothing happens") + " (target)"
            : "count"}{" "}
        </div>
      </div>
    </div>
  );
};
