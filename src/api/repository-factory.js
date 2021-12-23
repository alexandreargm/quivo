import trendingRepository from './repositories/trending-repository'

const respositories = {
  trending: trendingRepository
}

export default {
  get: (repositoryName) => respositories[repositoryName]
}
