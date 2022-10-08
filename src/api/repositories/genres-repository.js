import client from '../axios-client'

const validMediaTypes = ['movie', 'tv']

function checkIsValidMediaType (mediaType) {
  if (!validMediaTypes.includes(mediaType)) {
    console.warn(mediaType + ' is not a valid media type. Valid types: ' + validMediaTypes.join(', '))
  }
}

export default {
  fetch (mediaType) {
    checkIsValidMediaType(mediaType)

    return client.get(`/genre/${mediaType}/list`)
  }
}
