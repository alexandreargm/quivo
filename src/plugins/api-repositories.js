import repositoryFactory from '../api/repository-factory'

export default {
  install: (app) => {
    app.config.globalProperties.$repos = repositoryFactory
  }
}
