const getters = {
  getAllMovies: state => state.all
}

const actions = {
  async fetchMovies ({ commit }, fetchParams) {
    //
  }
}

const mutations = {
  SET_MOVIES (state, movies) {
    state.all = movies
  }
}

const state = {
  all: []
}

// "namespaced" is required to avoid calling multiple
// actions/mutations at the same time.
// Ref: https://vuex.vuejs.org/guide/modules.html#namespacing
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
