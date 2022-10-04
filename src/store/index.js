import { createStore } from 'vuex'

export default createStore({
  state: {
    publicarAlertas: Boolean,
    user: Object
  },
  getters: {
    getPublicarAlertas: state => {
      return state.publicarAlertas
    },
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setPublicarAlertas (state, payload) {
      state.publicarAlertas = payload
    },
    setUser(state, payload){
      state.user = payload
    }

  },
  actions: {
  },
  modules: {
  }
})
