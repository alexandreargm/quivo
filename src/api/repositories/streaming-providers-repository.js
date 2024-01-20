import client from '../axios-client'

export default {
  find({ titleId }) {
    return client.get(`/movie/${titleId}/watch/providers`)
  }
}
