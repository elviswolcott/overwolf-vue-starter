const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // all of the code should go in the Files directory
  outputDir: "dist/Files",
  assetsDir: "",
  publicPath: "Files",
  pages: {
    main: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "App Name",
      chunks: ["chunk-vendors", "chunk-common", "main"]
    },
    notifications: {
      entry: "src/notifications.js",
      template: "public/index.html",
      filename: "notifications.html",
      title: "App Name - Notifications",
      chunks: ["chunk-vendors", "chunk-common", "notifications"]
    },
    controller: {
      entry: "src/controller.js",
      template: "public/index.html",
      filename: "background.html",
      title: "App Name - Background Process",
      chunks: ["chunk-vendors", "chunk-common", "controller"]
    },
    egs: {
      entry: "src/egs.js",
      template: "public/egs.html",
      filename: "egs.html",
      title: "App Name - End Game Summary",
      chunks: ["chunk-vendors", "chunk-common", "egs"]
    }
  },
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
