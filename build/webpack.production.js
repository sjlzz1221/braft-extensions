var merge = require('webpack-merge')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
  , path = require('path')
  , baseConfigs = require('./webpack.base')

var entryNames = ['code-highlighter', 'color-picker']
var entries = {}

entryNames.forEach(item => entries[item] = `./${item}/index.jsx`)

module.exports = merge(baseConfigs, {
  mode: 'production',
  devtool: 'source-map',
  context: path.join(__dirname, '../src'),
  entry: entries,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'braft-editor': 'braft-editor',
    'draft-js': 'draft-js',
    'draft-convert': 'draft-convert',
    'draftjs-utils': 'draftjs-utils',
    'braft-finder': 'braft-finder',
    'braft-utils': 'braft-utils',
    'braft-convert': 'braft-convert',
    'immutable': 'immutable'
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.css$/,
      cssProcessor: require('cssnano'),
      sourceMap: true,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        },
        zindex: false,
        safe: true
      }
    }),
  ]
})
