/**
 * Axel Boberg © 2019
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const TARGET = process.env.npm_lifecycle_event

module.exports = {
  entry: {
    main: './app',
    worker: './app/worker'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: TARGET === 'dev' ? '[name].bundle.css' : '[hash].[name].bundle.css'
    })
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: TARGET === 'dev' ? '[name].bundle.js' : '[hash].[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ]
          }
        }
      },
      {
        test: /\.(svg|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            name: 'assets/[name].[ext]',
            limit: 5000,
            emitFile: true
          }
        }
      },{
        test: /\.(png|jp(e*)g)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
            emitFile: true
          }
        }
      },{
        test: /\.(txt)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            emitFile: true
          }
        }
      },{
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}