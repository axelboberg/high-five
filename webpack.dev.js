/**
 * Axel Boberg © 2019
 */

const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const template = require('./app/template')
const htmlPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 8080
  },
  plugins: [
    new htmlPlugin({
      templateContent: template('/', {
        state: { dummy: true }
      })
    })
  ]
})