const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

const nodeENV = process.env.NODE_ENV

console.log("nodeENV", nodeENV)

const config = {
  entry: { main: ["./src/sass/main.scss"] },
  output: {
    path: path.resolve(__dirname, "./src/dist"),
    // filename: 'main.js',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  watchOptions: {
    ignored: ["**/dist/**/*.*", "**/node_modules"],
  },
}

module.exports = () => {
  switch (nodeENV) {
    case "production":
      config.mode = "production"
      config.optimization = {
        minimizer: [new CssMinimizerPlugin()],
      }
      break
    case "spy":
      config.mode = "development"
      config.watch = true
      break

    default:
      config.mode = "development"
      break
  }

  return config
}
