const StyleDictionary = require('style-dictionary')
const chroma = require('chroma-js')

// Handles colors using chroma.js.
// https://gka.github.io/chroma.js/#installation
const hexToHsl = (hexValue) =>  {
  const [hueValue, ...otherValues] = chroma(hexValue).hsl()

  const hue = isNaN(hueValue) ? 0 : Math.round(hueValue) // Hue has to be cast from decimal to integer

  const [saturation, lightness] = otherValues.map(value => Math.round(value * 100))

  // console.log(hexValue, [hue, saturation, lightness].join(','))

  return `${hue} ${saturation}% ${lightness}%`
}

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionary.registerFormat({
  name: 'custom-scss-map',
  formatter: function (dictionary) {
    const getMapValuesString = dictionary.allProperties.map(prop => `  '${prop.name}': ${prop.value}`).join(',\n')
    return `$${this.selector}: (\n${getMapValuesString}\n);\n`
  }
})

StyleDictionary.registerFormat({
  name: 'custom-js-es6',
  formatter: function (dictionary) {
    const getMapValuesString = dictionary.allProperties.map(prop => `export const ${prop.name} = '${prop.value}'`).join('\n')

    return `${getMapValuesString}\n`
  }
})

StyleDictionary.registerTransform({
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

StyleDictionary.registerTransform({
  name: 'lineheights/number',
  type: 'value',
  matcher: function (prop) {
    return prop.type === 'lineHeights'
  },
  transformer: function (prop) {
    // Replace % based values to decimal numbers. (125% -> 1.25)
    return prop.value.replace('%', '') * 0.01
  }
})

function getStyleDictionaryConfig (theme) {
  return {
    source: [__dirname + `/tokens/${theme}.json`],
    platforms: {
      scss: {
        transforms: ['attribute/cti', 'name/cti/kebab', 'sizes/px', 'lineheights/number'],
        buildPath: 'src/assets/scss/tokens/',
        files: [{
          destination: `${theme}.scss`,
          format: 'custom-scss-map',
          selector: theme
        }]
      },
      js: {
        transforms: ['attribute/cti', 'name/cti/constant', 'sizes/px', 'lineheights/number'],
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

['base', 'colors', 'breakpoints', 'indexes', 'dark', 'light'].map(function (theme) {
  console.log('\n==============================================')
  console.log(`\nProcessing: [${theme}]`)

  const StyleDictionaryExtended = StyleDictionary.extend(getStyleDictionaryConfig(theme))

  StyleDictionaryExtended.buildAllPlatforms()

  console.log('\nEnd processing')
})

console.log('\n==============================================')
console.log('\nBuild completed!')
