import client from '../axios-client'
import { getIncludedExcludedValues, encodeValues, getDateRangeValues } from '@/composables/useTagFilter'

const validMediaTypes = ['movie', 'tv']

function checkIsValidMediaType (mediaType) {
  if (!validMediaTypes.includes(mediaType)) {
    console.warn(mediaType + ' is not a valid media type. Valid types: ' + validMediaTypes.join(', '))
  }
}

export const titlesRepository = {
  find ({ mediaType, id }) {
    checkIsValidMediaType(mediaType)

    return client.get(`/${mediaType}/${id}?append_to_response=release_dates`)
  },

  search({
    title = '',
    keywords = [],
    excludedKeywords = [],
    genres = [],
    excludedGenres = [],
    startDate = '',
    endDate = '',
    page = 1
  }) {
    const queryParameters = [
      ['page=', page],
      ['with_text_query=', title],
      ['with_keywords=', encodeValues(keywords, 'AND')],
      ['without_keywords=', encodeValues(excludedKeywords, 'AND')],
      ['with_genres=', encodeValues(genres, 'AND')],
      ['without_genres=', encodeValues(excludedGenres, 'AND')],
      ['release_date.gte=', startDate],
      ['release_date.lte=', endDate]
    ]

    const activeQueryParameters = queryParameters
      .filter(([_, value]) => value !== '')
      .map(([param, value]) => param + value)
      .join('&')

    return client.get(`/discover/movie?${activeQueryParameters}`).then(({ data }) => {
      return {
        entries: data.results,
        pageCount: data.total_pages,
        entryCount: data.total_results
      }
    })
  },

  search2 ({ mediaType, page = 1, title = '', keywords = [], genres = [], dateRange = ['', ''] }) {
    checkIsValidMediaType(mediaType)
    const { includes: includedKeywords, excludes: excludedKeywords } = getIncludedExcludedValues(keywords)
    const { includes: includedGenres, excludes: excludedGenres } = getIncludedExcludedValues(genres)
    const [startDate, endDate] = getDateRangeValues(dateRange)

    const queryParameters = [
      ['page=', page],
      ['with_text_query=', title],
      ['with_keywords=', encodeValues(includedKeywords, 'AND')],
      ['without_keywords=', encodeValues(excludedKeywords, 'AND')],
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

  simpleSearch({ title = '', page = 1 }) {
    return client.get(`/search/movie?query=${title}&page=${page}`)
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
