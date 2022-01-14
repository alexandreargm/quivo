import trendingRepository from './repositories/trending-repository'
import titlesRepository from './repositories/titles-repository'
import discoverRepository from './repositories/discover-repository'

const respositories = {
  trending: trendingRepository,
  titles: titlesRepository,
  discover: discoverRepository
}

export default {
  get: (repositoryName) => respositories[repositoryName]
}
