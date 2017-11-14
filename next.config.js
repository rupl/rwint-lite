require('dotenv').config()
const webpack = require('webpack')
module.exports = {
  webpack: function (config, { dev }) {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )

    // For the development version, we'll use React.
    // Because, it supports react hot loading and so on.
    if (dev) {
      return config
    }

    config.resolve.alias = {
      'react': 'preact-compat/dist/preact-compat',
      'react-dom': 'preact-compat/dist/preact-compat'
    }

    return config
  }
}
