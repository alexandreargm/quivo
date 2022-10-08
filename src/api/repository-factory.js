import trendingRepository from './repositories/trending-repository'
import titlesRepository from './repositories/titles-repository'
import discoverRepository from './repositories/discover-repository'
import genresRepository from './repositories/genres-repository'

const respositories = {
  trending: trendingRepository,
  titles: titlesRepository,
  discover: discoverRepository,
  genres: genresRepository
}

export default {
  get: (repositoryName) => respositories[repositoryName]
}
