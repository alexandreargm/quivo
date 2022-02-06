export default function getStyleProperty (propertyName) {
  return getComputedStyle(document.documentElement).getPropertyValue(propertyName)
}

export {
  getStyleProperty
}
