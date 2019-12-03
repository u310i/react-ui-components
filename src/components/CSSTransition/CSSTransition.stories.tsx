import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import CSSTransition from "./CSSTransition";
import BaseElement from "../BaseElement/BaseElement";
import { childrenHorizontalSpacing } from "../../_storybook/style";

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
      <button onClick={() => setState(prev => !prev)}>toggle</button>
      <CSSTransition
        in={state}
        timeout={{ appear: 1000, enter: 2000, exit: 500 }}
        onEnter={(_node, appear) =>
          console.log(`onEnter${appear ? ": appear" : ""}`)
        }
        onEntering={(_node, appear) =>
          console.log(`onEntering${appear ? ": appear" : ""}`)
        }
        onEntered={(_node, appear) =>
          console.log(`onEntered${appear ? ": appear" : ""}`)
        }
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
  const [mountState, setMount] = React.useState(false);
  const [state, setState] = React.useState(true);
  return (
    <div>
      <BaseElement style={childrenHorizontalSpacing}>
        <button onClick={() => setMount(prev => !prev)}>mount</button>
        <button onClick={() => setState(prev => !prev)}>toggle</button>
      </BaseElement>

      {mountState ? (
        <CSSTransition
          in={state}
          appear={true}
          timeout={2000}
          onEnter={(_node, appear) =>
            console.log(`onEnter${appear ? ": appear" : ""}`)
          }
          onEntering={(_node, appear) =>
            console.log(`onEntering${appear ? ": appear" : ""}`)
          }
          onEntered={(_node, appear) =>
            console.log(`onEntered${appear ? ": appear" : ""}`)
          }
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
      ) : null}
    </div>
  );
};
