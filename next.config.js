require('dotenv').config()
const webpack = require('webpack')
module.exports = {
  webpack: function (config, { dev }) {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  }
}
