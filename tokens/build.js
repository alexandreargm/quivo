const StyleDictionaryPackage = require('style-dictionary')

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionaryPackage.registerFormat({
  name: 'custom-scss-map',
  formatter: function (dictionary) {
    return `$${this.selector}: (\n${dictionary.allProperties.map(prop => `  '${prop.name}': ${prop.value},\n`)})`
  }
})

StyleDictionaryPackage.registerTransform({
  name: 'sizes/px',
  type: 'value',
  matcher: function (prop) {
    // You can be more specific here if you only want 'em' units for font sizes
    return ['fontSizes', 'spacing', 'borderRadius', 'borderWidth', 'sizing'].includes(prop.attributes.category)
  },
  transformer: function (prop) {
    // You can also modify the value here if you want to convert pixels to ems
    return parseFloat(prop.original.value) + 'px'
  }
})

function getStyleDictionaryConfig (theme) {
  return {
    source: [
      `tokens/${theme}.json`
    ],
    platforms: {
      scss: {
        transforms: ['attribute/cti', 'name/cti/kebab', 'sizes/px'],
        buildPath: 'src/assets/scss/abstracts/tokens/',
        files: [{
          destination: `${theme}.scss`,
          format: 'custom-scss-map',
          selector: theme
        }]
      },
      js: {
        transforms: ['attribute/cti', 'name/ti/camel', 'sizes/px', 'color/hex'],
        buildPath: 'src/assets/js/tokens/',
        files: [{
          destination: `${theme}.js`,
          format: 'javascript/es6',
          selector: theme
        }]
      }
    }
  }
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['base', 'dark', 'light'].map(function (theme) {
  console.log('\n==============================================')
  console.log(`\nProcessing: [${theme}]`)

  const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme))

  StyleDictionary.buildPlatform('scss', 'js')

  console.log('\nEnd processing')
})

console.log('\n==============================================')
console.log('\nBuild completed!')
