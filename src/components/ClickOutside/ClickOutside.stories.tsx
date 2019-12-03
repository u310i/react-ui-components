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
  const [scopeState, setScope] = React.useState("default");
  const [activeState, setActive] = React.useState(true);
  const ref1 = React.useRef<null | HTMLDivElement>(null);
  const ref2 = React.useRef<null | HTMLDivElement>(null);
  const scopeRef = React.useRef<null | HTMLDivElement>(null);
  const targetText = "Nothing happens";
  const notTargetText = "count";
  const getCommentOfTarget = (
    refName: string,
    targetState: any,
    ignoreTargetState: any
  ) => {
    return targetState === refName
      ? (ignoreTargetState ? notTargetText : targetText) + " (this is target)"
      : notTargetText;
  };
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
          action={event => {
            console.log(event.target);
            setState(prev => ++prev);
          }}
          ignoreTarget={ignoreTargetState}
          scope={
            scopeState === "default"
              ? document.body
              : scopeState === "parent"
              ? window.parent.document.body
              : scopeRef
          }
          active={activeState}
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
          <button
            onClick={() =>
              setScope(prev =>
                prev === "default"
                  ? "element"
                  : prev === "element"
                  ? "parent"
                  : "default"
              )
            }
          >
            change scope
          </button>
          <button onClick={() => setActive(prev => !prev)}>
            change active
          </button>
        </BaseElement>
        <div>{activeState ? "active" : "not active"}</div>
        <div>{state}</div>
        <div ref={scopeRef} style={{ padding: "15px", border: "solid 1px" }}>
          {scopeState === "element"
            ? "this is scope"
            : scopeState === "parent"
            ? "scope is window.parent.document.body"
            : "scope is document.body"}
          <div style={{ padding: "15px", border: "solid 1px" }} ref={ref1}>
            {getCommentOfTarget("ref1", targetState, ignoreTargetState)}
            <div style={{ border: "solid 1px" }}>
              {targetState === "ref1" ? targetText : notTargetText}
            </div>
          </div>
        </div>
        <div style={{ padding: "15px", border: "solid 1px" }} ref={ref2}>
          {getCommentOfTarget("ref2", targetState, ignoreTargetState)}
          <div style={{ border: "solid 1px" }}>
            {targetState === "ref2" ? targetText : notTargetText}
          </div>
        </div>
      </div>
    </div>
  );
};
