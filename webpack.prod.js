const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('./config');

module.exports = {
  mode: 'production',
  entry: [
    // Required for using functions such as .findIndex in the client
    '@babel/polyfill',
    config.pathSource + config.pathJSAbsolute + config.filenameEntry,
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: config.pathJSRelative + config.filenameOutput,
    path: config.pathOutput,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
          },
        ],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    // Really helps to keep file size down
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // Use our own Handlebars template for index.html, add hashes to the links, don't automatically inject links (we do it manually)
    new htmlWebpackPlugin({
      ga: process.env.GOOGLE_ID || '1234',
      hash: true,
      inject: false,
      template:
        config.pathSource + config.pathSourceTemplate + config.filenameTemplate,
      filename: config.filenameHTML,
    }),
    // Create a separate CSS file in the appropriate folder
    new MiniCssExtractPlugin({
      filename: config.pathCSSRelative + config.filenameCSS,
      chunkFilename: '[id].css',
    }),
  ],
};
