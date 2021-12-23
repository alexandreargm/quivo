import client from '../axios-client'

const resource = 'trending'

export default {
  search ({ mediaType = 'all', timeWindow = 'week' } = {}) {
    return client.get(`/${resource}/${mediaType}/${timeWindow}`)
  }
}
