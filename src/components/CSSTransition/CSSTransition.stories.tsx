import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import CSSTransition from "./CSSTransition";
import Button from "../Button/Button";
import BaseElement from "../BaseElement/BaseElement";

export default {
  title: "CSSTransition",
  component: CSSTransition,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

export const basic = () => {
  const [state, setState] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setState(prev => !prev)}>toggle</Button>
      <CSSTransition
        in={state}
        timeout={{ appear: 1000, enter: 2000, exit: 500 }}
        onEnter={() => console.log("onEnter")}
        onEntering={() => console.log("onEntering")}
        onEntered={() => console.log("onEntered")}
        onExit={() => console.log("onExit")}
        onExiting={() => console.log("onExiting")}
        onExited={() => console.log("onExited")}
      >
        {(
          state: $Type.Components.CSSTransition._ChildStatus,
          childProps: JSX.IntrinsicElements["div"]
        ) => {
          return (
            <div
              style={{
                marginTop: "10px"
              }}
              {...childProps}
            >
              <div>Look at the class!</div>
              <div
                style={{
                  border: "solid 1px",
                  backgroundColor:
                    state === "entered"
                      ? "Cyan"
                      : state === "exited"
                      ? "orange"
                      : "white"
                }}
              >
                state: {state}
              </div>
            </div>
          );
        }}
      </CSSTransition>
    </div>
  );
};

export const appear = () => {
  const [state, setState] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setState(prev => !prev)}>toggle</Button>
      {state ? (
        <CSSTransition
          in={state}
          appear={true}
          timeout={2000}
          onEnter={() => console.log("onEnter")}
          onEntering={() => console.log("onEntering")}
          onEntered={() => console.log("onEntered")}
        >
          {(
            state: $Type.Components.CSSTransition._ChildStatus,
            childProps: JSX.IntrinsicElements["div"]
          ) => {
            return (
              <div
                style={{
                  marginTop: "10px"
                }}
                {...childProps}
              >
                <div>Look at the class!</div>
                <div
                  style={{
                    border: "solid 1px",
                    backgroundColor:
                      state === "entered"
                        ? "Cyan"
                        : state === "exited"
                        ? "orange"
                        : "white"
                  }}
                >
                  state: {state}
                </div>
              </div>
            );
          }}
        </CSSTransition>
      ) : null}
    </div>
  );
};
