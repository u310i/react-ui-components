const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loaders: [
      {
        loader: require.resolve("ts-loader"),
        options: {
          transpileOnly: true
        }
      },
      {
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          tsconfigPath: path.join(__dirname, "../tsconfig.json"),
          propFilter(prop, component) {
            if (prop.parent) {
              return !prop.parent.fileName.includes("node_modules");
            }

            if (component.name === "Button") {
              console.log(
                "#####################################################"
              );
              console.log(component);
              console.log(prop);
              prop.type.name = "test";
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
    ]
  });
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve("@storybook/source-loader"),
        options: {
          parser: "typescript"
        }
      }
    ],
    enforce: "pre"
  });
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
