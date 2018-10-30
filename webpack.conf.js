const { ProvidePlugin } = require('webpack')

module.exports = {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new ProvidePlugin({
      'h': ['hyperapp', 'h']
    })
  ]
}