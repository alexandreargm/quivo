// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  // Set route for gh-pages. Ref.: https://cli.vuejs.org/config/#publicpath
  publicPath: process.env.NODE_ENV === 'production' ? '/quivo/' : '/',
  css: {
    // ref: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/scss/abstracts/_all.scss";'
      }
    }
  },
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin()
    ]
  }
}
