const path = require("path");

module.exports = {
  entry: "./dist/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
    compress: true,
    port: 8080,
  },
};
