const StyleDictionaryPackage = require('style-dictionary')

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionaryPackage.registerFormat({
  name: 'custom-scss-map',
  formatter: function (dictionary) {
    const getMapValuesString = dictionary.allProperties.map(prop => `  '${prop.name}': ${prop.value}`).join(',\n')
    return `$${this.selector}: (\n${getMapValuesString}\n);\n`
  }
})

StyleDictionaryPackage.registerFormat({
  name: 'custom-js-es6',
  formatter: function (dictionary) {
    const getMapValuesString = dictionary.allProperties.map(prop => `export const ${prop.name} = '${prop.value}';`).join('\n')

    return `${getMapValuesString}\n`
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
        transforms: ['attribute/cti', 'name/cti/constant', 'sizes/px'],
        buildPath: 'src/assets/js/tokens/',
        files: [{
          destination: `${theme}.js`,
          format: 'custom-js-es6',
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

  StyleDictionary.buildAllPlatforms()

  console.log('\nEnd processing')
})

console.log('\n==============================================')
console.log('\nBuild completed!')
