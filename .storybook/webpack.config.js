const path = require("path");
// const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("ts-loader"),
        options: {
          configFile: path.resolve(__dirname, "../tsconfig.json"),
          transpileOnly: true
        }
      },
      {
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
          propFilter(prop, component) {
            if (prop.parent) {
              return !prop.parent.fileName.includes("node_modules");
            }

            if (component.name === "Dialog") {
              console.log(
                "#####################################################"
              );
              console.log(component);
              console.log(prop);
              // prop.type.name = "test";
              // const ex = [
              //   { name: 'Button' },
              //   { defaultValue: null,
              //     description: '',
              //     name: 'classNames',
              //     parent: undefined,
              //     required: false,
              //     type: { name: 'string[] | undefined' } }
              // ]
            }
            return ![
              "type",
              "className",
              "id",
              "style",
              "elementName",
              "classNames",
              "ids",
              "arias",
              "refer",
              "testid"
            ].includes(prop.name);
          }
        }
      }
    ],
    include: [path.resolve(__dirname, "../src")],
    exclude: [path.resolve(__dirname, "../node_modules")]
  });

  // config.module.rules.push({
  //   test: /\.(ts|tsx)$/,
  //   exclude: path.resolve(__dirname, "..", "node_modules"),
  //   use: [
  //     {
  //       loader: require.resolve("babel-loader"),
  //       options: {
  //         presets: [require.resolve("babel-preset-react-app")]
  //       }
  //     },
  //     {
  //       loader: require.resolve("react-docgen-typescript-loader"),
  //       options: {
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
  //       }
  //     }
  //   ]
  // });

  // config.module.rules.push({
  //   test: /\.(stories|story)\.mdx$/,
  //   use: [
  //     {
  //       loader: "babel-loader",
  //       // may or may not need this line depending on your app's setup
  //       options: {
  //         plugins: ["@babel/plugin-transform-react-jsx"]
  //       }
  //     },
  //     {
  //       loader: "@mdx-js/loader",
  //       options: {
  //         compilers: [createCompiler({})]
  //       }
  //     }
  //   ]
  // });

  // config.module.rules.push({
  //   test: /\.(stories|story)\.[tj]sx?$/,
  //   loader: require.resolve("@storybook/source-loader"),
  //   options: {
  //     parser: "typescript",
  //     inspectLocalDependencies: true
  //   },
  //   exclude: [/node_modules/],
  //   enforce: "pre"
  // });

  config.resolve.extensions.push(".ts", ".tsx");
  config.resolve.alias = {
    components: path.resolve(__dirname, "../src/components/"),
    scripts: path.resolve(__dirname, "../src/scripts"),
    icons: path.resolve(__dirname, "../src/icons"),
    fonts: path.resolve(__dirname, "../src/fonts"),
    images: path.resolve(__dirname, "../src/images")
  };

  return config;
};

// options: {
//   tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
//   propFilter(prop, component) {
//     if (prop.parent) {
//       return !prop.parent.fileName.includes("node_modules");
//     }

//     if (component.name === "Button") {
//       console.log(
//         "#####################################################"
//       );
//       console.log(component);
//       console.log(prop);
//       // prop.type.name = "test";
//       // const ex = [
//       //   { name: 'Button' },
//       //   { defaultValue: null,
//       //     description: '',
//       //     name: 'classNames',
//       //     parent: undefined,
//       //     required: false,
//       //     type: { name: 'string[] | undefined' } }
//       // ]
//     }
//     return ![
//       "type",
//       "className",
//       "id",
//       "style",
//       "elementName",
//       "classNames",
//       "ids",
//       "arias",
//       "refer",
//       "testid"
//     ].includes(prop.name);
//   }
// }
