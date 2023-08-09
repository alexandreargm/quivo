import client from '../axios-client'

const validMediaTypes = ['movie', 'tv']

function checkIsValidMediaType (mediaType) {
  if (!validMediaTypes.includes(mediaType)) {
    console.warn(mediaType + ' is not a valid media type. Valid types: ' + validMediaTypes.join(', '))
  }
}

export const genresRepository = {
  fetch (mediaType = 'movie') {
    checkIsValidMediaType(mediaType)

    return client.get(`/genre/${mediaType}/list`).then(({data}) => {
      return data.genres.map(genre => ({
        id: String(genre.id),
        title: genre.name
      }))
    })
  }
}
