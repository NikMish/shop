const path = require("path");
const sourceDirectory = path.resolve(__dirname, 'react');
const buildDirectory = path.resolve(__dirname, 'js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  entry: {
    'shop': `${sourceDirectory}/index.js`
  },
  output: {
    filename: `[name].js`,
    path: buildDirectory
  },

  devtool: 'source-map',
  target: "web",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `../css/[name].css`
    })
  ],
};