import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : null,
    photoUrl : ''
  },
  mutations: {
    saveUser(store,user){
      store.user = user
      store.photoUrl = user.photoURL
    },
    clearUser(store){
      store.user = null
    }
  },
  actions: {
    loginUser({ commit },user){
      commit('saveUser',user)
    },
    logoutUser({ commit }){
      commit('clearUser')
    }
  }
})
