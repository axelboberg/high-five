/**
 * Axel Boberg © 2019
 */

const merge = require('webpack-merge')
const common = require('./webpack.common')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const AssetMap = require('webpack-asset-map')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new OptimizeCSSPlugin(),
    new AssetMap({
      path: './'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      })
    ]
  }
})