export function encodeValues (values, mode) {
  const MODE_CHARACTER = {
    OR: '|',
    AND: ','
  }

  return values.join(MODE_CHARACTER[mode])
}

export function getIncludedExcludedValues (tags) {
  return tags.reduce(
    (idsAccumulator, { state, value }) => {
      if (state > 0) {
        state === 1
          ? idsAccumulator.includes.push(value)
          : idsAccumulator.excludes.push(value)
      }

      return idsAccumulator
    },
    {
      includes: [],
      excludes: []
    }
  )
}

export function getDateRangeValues (tag) {
  return Object.entries(tag).length > 0
    ? tag.value
    : ['', '']
}
