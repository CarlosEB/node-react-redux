var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'client', 'build');
var mainPath = path.resolve(__dirname, 'client/src', 'main.js');

var config = {

  devtool: 'source-map',
  entry: mainPath,
  output: { path: buildPath, filename: 'bundle.js', publicPath: '/client/build' },
  module: {
    loaders: [
      { test: [/\.js$/, /\.jsx$/], loader: 'babel-loader', exclude: [nodeModulesPath] },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: [/\.ttf$/, /\.eot$/, /\.svg$/], loader: "file-loader" }
    ]
  },
  plugins: [ 
    new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
    new webpack.DefinePlugin({ 'process.env': {'NODE_ENV': JSON.stringify('production') } })
  ] };

module.exports = config;