const { join } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.conf.js')


module.exports = merge(base, {
  mode: 'development',
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'css-loader'
        }
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
})