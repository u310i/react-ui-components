import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import EventListener from "./EventListener";
import BaseElement from "../BaseElement/BaseElement";
import { childrenVerticalSpacing } from "../../_storybook/style";

export default {
  title: "EventListener",
  component: EventListener,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

export const basic = () => {
  const [state, setState] = React.useState(0);
  const handleState = React.useCallback(() => {
    setState(prev => ++prev);
  }, []);
  const ref1 = React.useRef<null | HTMLDivElement>(null);
  const ref2 = React.useRef<null | HTMLDivElement>(null);

  const [eventTypeState, setEventType] = React.useState("mouseup");
  const [targetState, setTarget] = React.useState("ref1");

  return (
    <div style={{ padding: "50px" }}>
      <EventListener
        target={targetState === "ref1" ? ref1 : ref2}
        type={eventTypeState}
        listener={handleState}
      />
      <BaseElement style={childrenVerticalSpacing}>
        <button
          onClick={() =>
            setEventType(prev => {
              return prev === "mouseup" ? "mousedown" : "mouseup";
            })
          }
        >
          change event type (mouseup or mousedown)
        </button>
        <button
          onClick={() =>
            setTarget(prev => {
              return prev === "ref1" ? "ref2" : "ref1";
            })
          }
        >
          change event target (mouseup or mousedown)
        </button>
        <div ref={ref1} style={{ border: "solid 1px" }}>
          {targetState === "ref1"
            ? `click!(${eventTypeState})`
            : "Nothing happens"}
        </div>
        <div ref={ref2} style={{ border: "solid 1px" }}>
          {targetState === "ref2"
            ? `click!(${eventTypeState})`
            : "Nothing happens"}
        </div>
        <div>{state}</div>
      </BaseElement>
    </div>
  );
};
