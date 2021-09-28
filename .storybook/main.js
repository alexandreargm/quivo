const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config) => {

    // Allow the use of @ alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src/'),
    }

    // Load scss colors, mixins, variables, etc.
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'postcss-loader', 
        {
          loader: 'sass-loader',
          options: {
            prependData: '@import "../assets/scss/abstracts/_all.scss"; @import "../assets/scss/main.scss";'
          }
        }
      ],
    })

    return config
  },
}