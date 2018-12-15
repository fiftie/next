const cwd = process.cwd();
const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

console.log(__dirname + '/client/src/index.jsx');
console.log(path.resolve(__dirname, 'client/src'));

module.exports = {
  context: path.resolve(__dirname, 'client/src'),
  mode: 'development', // development or production
  entry: {
    index: path.resolve(__dirname, 'client/src/index.jsx'),
  },
  output: {
    path: __dirname + '/client/dist/js',
    // publicPath: '/js/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /(\.js$)|(\.jsx$)/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react', 'stage-0'],
              // plugins: ['transform-object-assign', "transform-object-rest-spread"]
            }
          },
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, "./client/src"),
      "node_modules"
    ],
    extensions: ['.js', '.jsx'],
  },
  plugins: [],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          },
          output: {
            beautify: false,
            indent_level: 2
          }
        }
      })
    ]
  },
  // devtool: 'source-map',
   watch: true,
  // watchOptions: {
  //   aggregateTimeout: 500,
  //   ignored: [/node_modules/]
  // }
};