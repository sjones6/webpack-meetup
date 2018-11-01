const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const prod = require('./webpack.prod.js')

prod.plugins.push(new BundleAnalyzerPlugin())

module.exports = prod