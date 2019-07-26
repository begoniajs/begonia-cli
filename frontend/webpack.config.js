const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDir = './dist';
const outputPath = path.resolve(__dirname, outputDir);

module.exports = {
  mode: "production",
  entry: './src/app.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist/scripts/')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      path: outputPath,
      filename: 'index.html',
      template: './public/index.html'
    })
  ],
  devtool: 'source-map'
};
