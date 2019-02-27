const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // all of the code should go in the Files directory
  outputDir: "dist/Files",
  assetsDir: "",
  publicPath: "Files",
  configureWebpack: {
    plugins: [
      // copy over the necessary files into the containing directory
      new CopyPlugin([
        { from: "overwolf/manifest.json", to: "../manifest.json" },
        { from: "overwolf/IconMouseNormal.png", to: "../IconMouseNormal.png" },
        { from: "overwolf/IconMouseOver.png", to: "../IconMouseOver.png" },
        { from: "overwolf/Icon.ico", to: "../Icon.ico" }
      ])
    ]
  }
};
