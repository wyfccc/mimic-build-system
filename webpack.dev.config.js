const merge = require("webpack-merge");
const common = require("./webpack.common.config");

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    contentBase: "./public",
    port: 3000,
  },
});
