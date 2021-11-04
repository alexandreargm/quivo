const StyleDictionaryPackage = require('style-dictionary')

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionaryPackage.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary, config) {
    return `$${this.selector}: (
      ${dictionary.allProperties.map(prop => ` '${prop.name}': ${prop.value},`).join('\n')}
    )`
    // return `${this.selector} {
    //     ${dictionary.allProperties.map(prop => `  --${prop.name}: ${prop.value};`).join('\n')}
    //   }`
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
      'scss-map': {
        transforms: ['attribute/cti', 'name/cti/kebab', 'sizes/px'],
        buildPath: 'src/assets/scss/abstracts/tokens/',
        files: [{
          destination: `${theme}.scss`,
          format: 'scss/map-flat',
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

  StyleDictionary.buildPlatform('scss-map')

  console.log('\nEnd processing')
})

console.log('\n==============================================')
console.log('\nBuild completed!')
