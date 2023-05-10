import client from '../axios-client'

export function search ({query = '', page = '1'}) {
  return client.post('/search/multi/', {
    query,
    page
  })
}
