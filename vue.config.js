// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  css: {
    // ref: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/scss/abstracts/_all.scss";'
      }
    },
    extract: {
      filename: 'css/[name].css?_hash=[contenthash:8]',
      chunkFilename: 'css/[name].css?_hash=[contenthash:8]'
    }
  },
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin()
    ]
  },
  chainWebpack: (config) => {
    config.module
      .rule('mjs')
      .test(/\.mjs$/)
      .type('javascript/auto')
      .include.add(/node_modules/)
      .end()

      config.module.rules.delete('svg')

      config.module
        .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('vue-loader')
        .loader('vue-loader')
        .end()
        .use('vue-svg-loader')
        .loader('vue-svg-loader')
  }
}
