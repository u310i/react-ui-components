import * as React from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { action, decorate } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import BaseElement from "./BaseElement";

export default {
  title: "BaseElement",
  component: BaseElement,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

export const Basic = () => {
  return (
    <div>
      <BaseElement>div</BaseElement>
      <BaseElement elementName="button">button</BaseElement>
      <BaseElement elementName="input" />
      <BaseElement elementName="input" type="submit" />
    </div>
  );
};
