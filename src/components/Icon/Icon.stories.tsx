import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Icon from "./Icon";
import BaseElement from "../BaseElement/BaseElement";
import { childrenVerticalSpacing } from "../../_storybook/style";

export default {
  title: "Icon",
  component: Icon,
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
    <BaseElement style={childrenVerticalSpacing}>
      <Icon
        type="fa"
        icon={["fab", "apple"]}
        size="2x"
        // flip="both"
        // border
        // rotation={90}
        // flip="horizontal"
        transform="translate(100 -200)  rotate(150 0 0)  scale(1 1.5)"
        className="aaaaaaaaaaaaaaaaaaaaaaaaaa"
      />
      <Icon
        type="fa"
        icon={["fab", "apple"]}
        size="2x"
        // flip="both"
        // pull="right"
      />
      aaaaaaaaaaa
      <Icon
        type="fa"
        icon={["fas", "angle-double-left"]}
        size="2x"
        // flip="both"
        // border
        // pull="right"
      />
      <Icon
        type="fa"
        icon={["fab", "apple"]}
        size="2x"
        // flip="both"
        border
      />
      <Icon
        type="fa"
        icon={["fab", "apple"]}
        size="2x"
        // flip="both"
        border={{ border: "solid 0.12em #c71585" }}
        fixedWidth
      />
      <Icon icon="bird" symbol />
      <Icon icon="bird" use size="3x" />
      <Icon icon="bird" size="3x" border />
      <Icon icon="envelope" currentColor />
      <Icon icon="message" currentColor />
      test test test
      <Icon icon="message" symbol currentColor />
      <Icon icon="message" use />
    </BaseElement>
  );
};
