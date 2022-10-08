import client from '../axios-client'
import { getIncludedExcludedValues, encodeValues, getDateRangeValues } from '@/composables/useTagFilter'

const validMediaTypes = ['movie', 'tv']

function checkIsValidMediaType (mediaType) {
  if (!validMediaTypes.includes(mediaType)) {
    console.warn(mediaType + ' is not a valid media type. Valid types: ' + validMediaTypes.join(', '))
  }
}

export default {
  find ({ mediaType, id }) {
    checkIsValidMediaType(mediaType)

    return client.get(`/${mediaType}/${id}?append_to_response=release_dates`)
  },

  search ({ mediaType, title = '', keywords = [], genres = [], dateRange = ['', ''] }) {
    checkIsValidMediaType(mediaType)
    const { includes: includedKeywords, excludes: excludedKeywords } = getIncludedExcludedValues(keywords)
    const { includes: includedGenres, excludes: excludedGenres } = getIncludedExcludedValues(genres)
    const [startDate, endDate] = getDateRangeValues(dateRange)

    const queryParameters = [
      ['with_text_query=', title],
      ['with_keywords=', encodeValues(includedKeywords, 'AND')],
      ['with_keywords=', encodeValues(excludedKeywords, 'AND')],
      ['with_genres=', encodeValues(includedGenres, 'AND')],
      ['without_genres=', encodeValues(excludedGenres, 'AND')],
      ['release_date.gte=', startDate],
      ['release_date.lte=', endDate]
    ]

    const activeQueryParameters = queryParameters
      .filter(([_, value]) => value !== '')
      .map(([param, value]) => param + value)

    const searchQuery = activeQueryParameters.length > 0
      ? '?' + activeQueryParameters.join('&')
      : ''

    return client.get(`/discover/${mediaType}${searchQuery}`)
  },

  keywords ({ mediaType, id }) {
    checkIsValidMediaType(mediaType)

    return client.get(`/${mediaType}/${id}/keywords`)
  },

  similar ({ mediaType, id }) {
    checkIsValidMediaType(mediaType)

    return client.get(`/${mediaType}/${id}/similar`)
  },

  recommendations ({ mediaType, id }) {
    checkIsValidMediaType(mediaType)

    return client.get(`/${mediaType}/${id}/recommendations`)
  },

  releaseDates ({ mediaType, id }) {
    checkIsValidMediaType(mediaType)

    return client.get(`/${mediaType}/${id}/release_dates`)
  }
}
