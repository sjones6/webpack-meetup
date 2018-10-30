const merge = require('webpack-merge')
const base = require('./webpack.conf.js')

module.exports = merge(base, {
  mode: 'development',
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
  }
})