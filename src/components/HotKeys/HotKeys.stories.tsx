import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import HotKeys from "./HotKeys";
import BaseElement from "../BaseElement/BaseElement";
import { childrenHorizontalSpacing } from "../../_storybook/style";

export default {
  title: "HotKeys",
  component: HotKeys,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

export const basic = () => {
  const [typeState, setType] = React.useState<"keydown" | "keyup">("keydown");
  const [hotkeysState, setHotkeys] = React.useState<string | string[]>(
    "escape"
  );
  const [activeState, setActive] = React.useState(true);
  const [targetState, setTarget] = React.useState("default");

  const ref = React.useRef<null | HTMLDivElement>(null);

  return (
    <div style={{ padding: "10px" }}>
      <BaseElement style={childrenHorizontalSpacing}>
        <button
          onClick={() =>
            setHotkeys(prev => (prev === "escape" ? ["escape", "1"] : "escape"))
          }
        >
          change hotkey
        </button>
        <button
          onClick={() =>
            setType(prev => (prev === "keydown" ? "keyup" : "keydown"))
          }
        >
          change keydown or keyup
        </button>
        <button
          onClick={() =>
            setTarget(prev =>
              prev === "default"
                ? "focusable element"
                : prev === "focusable element"
                ? "parent"
                : "default"
            )
          }
        >
          target switch
        </button>
        <button onClick={() => setActive(prev => !prev)}>active switch</button>
      </BaseElement>
      <p>{activeState ? "active" : "not active"}</p>
      <p>{hotkeysState === "escape" ? "escape key" : "escape or 1 key"}</p>
      <p>{typeState}</p>
      <p>{targetState}</p>
      <HotKeys
        hotkeys={hotkeysState}
        action={() =>
          console.log(
            hotkeysState === "escape" ? "escape key" : "escape or 1 key"
          )
        }
        active={activeState}
        target={
          targetState === "default"
            ? undefined
            : targetState === "parent"
            ? window.parent.document
            : ref
        }
        type={typeState}
      />
      <input type="text" placeholder="Does not work when in focus"></input>
      <div
        ref={ref}
        tabIndex={1}
        style={{
          padding: "30px",
          backgroundColor: "cyan",
          border: "solid 1px",
          marginTop: "15px"
        }}
      >
        {targetState === "focusable element"
          ? "this is target"
          : targetState === "default"
          ? "target is document"
          : "target is parent document"}
      </div>
      <p>
        <a href="https://github.com/ccampbell/mousetrap">ccampbell/mousetrap</a>
      </p>
    </div>
  );
};
