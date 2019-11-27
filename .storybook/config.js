import { configure, addDecorator, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { configureActions } from "@storybook/addon-actions";
import { withConsole } from "@storybook/addon-console";
// import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";

// automatically import all files ending in *.stories.tsx
// import "../src/scripts/polyfill/index.ts";

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
  clearOnStoryChange: true
});

// addDecorator(
//   withInfo({
//     source: false,
//     styles: {
//       button: {
//         base: {
//           fontFamily: "sans-serif",
//           fontSize: "14px",
//           fontWeight: "500",
//           display: "block",
//           position: "fixed",
//           border: "none",
//           background: "#14558f",
//           color: "#fff",
//           opacity: 0.7,
//           padding: "5px 15px",
//           cursor: "pointer"
//         },
//         topRight: {
//           bottom: 17,
//           right: 17,
//           top: "unset",
//           borderRadius: "5px"
//         }
//       }
//     }
//   })
// );
addDecorator(withKnobs);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

addParameters({
  options: {
    name: "MyComponents"
  }
});

// addParameters({
//   docs: {
//     container: DocsContainer,
//     page: DocsPage
//   }
// });

addParameters({
  backgrounds: [
    { name: "twitter", value: "#00aced" },
    { name: "facebook", value: "#3b5998" }
  ]
});

configure(require.context("../src", true, /\.stories\.tsx?|mdx$/), module);
