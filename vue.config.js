module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'birthday-input'
    : '/',
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 3006,
    https: false,
    hotOnly: false,
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    config.plugin('define').tap(([options = {}]) => {
      options['process.env'].VERSION = JSON.stringify(require('./package.json').version)
      return [{
        ...options
      }]
    })
  }
}