import client from '../axios-client'

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
