module.exports = [
  {
    name: "@storybook/addon-docs/react/preset",
    options: {
      configureJSX: true,
      babelOptions: {}
      // sourceLoaderOptions: null
    }
  }
];

// module.exports = ["@storybook/addon-docs/react/preset"];
// module.exports = ["@storybook/preset-typescript"];
// const path = require("path");

// module.exports = [
//   {
//     name: "@storybook/preset-typescript",
//     options: {
//       tsLoaderOptions: {
//         configFile: path.resolve(__dirname, "../tsconfig.json"),
//         transpileOnly: true
//       },
//       tsDocgenLoaderOptions: {
//         tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
//         propFilter(prop, component) {
//           if (prop.parent) {
//             return !prop.parent.fileName.includes("node_modules");
//           }

//           if (component.name === "Button") {
//             console.log(
//               "#####################################################"
//             );
//             console.log(component);
//             console.log(prop);
//             // prop.type.name = "test";
//             // const ex = [
//             //   { name: 'Button' },
//             //   { defaultValue: null,
//             //     description: '',
//             //     name: 'classNames',
//             //     parent: undefined,
//             //     required: false,
//             //     type: { name: 'string[] | undefined' } }
//             // ]
//           }
//           return ![
//             "type",
//             "className",
//             "id",
//             "style",
//             "elementName",
//             "classNames",
//             "ids",
//             "arias",
//             "refer",
//             "testid"
//           ].includes(prop.name);
//         }
//       },
//       include: [path.resolve(__dirname, "../src")]
//     }
//   }
// ];
