const path = require("path")
const webpackNodeExternals = require("webpack-node-externals")

module.exports = {
  entry: "./app.js",
  mode: "production",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env"],
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
          ],
        },

        exclude: "/node_modules/",
      },
      {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          outputPath: path.join("..", "..", "frontend", "build", "static", "media"),
          publicPath: "/static/media/"
        }
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  node: {
    __dirname: false,
  },
  externalsPresets: { node: true },
  externals: [
    webpackNodeExternals({
      allowlist: [/^@babel\/runtime/],
    }),
    "react-helmet",
  ],
}
