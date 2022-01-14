import client from '../axios-client'

const validMediaTypes = ['all', 'movie', 'tv', 'person']

function checkIsValidMediaType (mediaType) {
  if (!validMediaTypes.includes(mediaType)) {
    console.warn(mediaType + ' is not a valid media type. Valid types: ' + validMediaTypes.join(', '))
  }
}

export default {
  search ({ mediaType = 'all', timeWindow = 'week' } = {}) {
    checkIsValidMediaType(mediaType)

    return client.get(`/trending/${mediaType}/${timeWindow}`)
  }
}
