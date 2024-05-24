const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: "react-zxing-scanner",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".js", ".css"],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        homepage: "https://www.instagram.com/tldkhang/",
        repository: {
          type: "git",
          url: "https://github.com/taleduykhang/react-zxing-scanner",
        },
      },
    }),
  ],
};
