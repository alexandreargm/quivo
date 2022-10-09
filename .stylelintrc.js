module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss'
  ],
  rules: {
    // order rules
    'order/properties-alphabetical-order': true,
    // Scss recommended rules
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['deep']
    }]
  }
}
