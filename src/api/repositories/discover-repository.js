import client from '../axios-client'

export default {
  discover () {
    return client.get('/discover/movie')
  }
}
