const path = require("path");

module.exports = {
  entry: "./src/ReactZxingScanner.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: "react-zxing-scanner",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".js", ".css", ".d.ts"],
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
};
