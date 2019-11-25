import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { configureActions } from "@storybook/addon-actions";
import { withConsole } from "@storybook/addon-console";

// automatically import all files ending in *.stories.tsx
// import "../src/scripts/polyfill/index.ts";

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
  clearOnStoryChange: true
});

addDecorator(
  withInfo({
    source: false
  })
);

addParameters({
  options: {
    name: "MyComponents"
  }
});
addDecorator(withKnobs);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

addParameters({
  backgrounds: [
    { name: "twitter", value: "#00aced" },
    { name: "facebook", value: "#3b5998" }
  ]
});

configure(require.context("../src", true, /\.stories\.tsx?$/), module);
