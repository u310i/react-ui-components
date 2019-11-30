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
  const [activeState, setActive] = React.useState(false);
  const [typeState, setType] = React.useState<"keydown" | "keyup">("keydown");
  const [hotkeysState, setHotkeys] = React.useState<string | string[]>(
    "escape"
  );

  return (
    <div style={{ padding: "10px" }}>
      <BaseElement style={childrenHorizontalSpacing}>
        <button onClick={() => setActive(prev => !prev)}>active switch</button>
        <button
          onClick={() =>
            setHotkeys(prev => (prev === "escape" ? ["escape", "1"] : "escape"))
          }
        >
          switch hotkey
        </button>
        <button
          onClick={() =>
            setType(prev => (prev === "keydown" ? "keyup" : "keydown"))
          }
        >
          switch keydown or keyup
        </button>
      </BaseElement>
      <p>{activeState ? "active" : "not active"}</p>
      <p>{hotkeysState === "escape" ? "escape key" : "escape or 1 key"}</p>
      <p>{typeState}</p>
      <HotKeys
        hotkeys={hotkeysState}
        action={() =>
          console.log(
            hotkeysState === "escape" ? "escape key" : "escape or 1 key"
          )
        }
        active={activeState}
        type={typeState}
      />
      <input type="text" placeholder="Does not work when in focus"></input>
      <p>
        <a href="https://github.com/ccampbell/mousetrap">ccampbell/mousetrap</a>
      </p>
    </div>
  );
};
