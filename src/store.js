import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { db } from '@/plugins/vuefire.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : null,
    name : '',
    photoURL : '',
    playUser : []
  },
  mutations: {
    saveUser(store,user){
      store.user = user
      let {displayName:name, photoURL} = user
      store.name = name
      store.photoURL = user.photoURL
    },
    addMeToPlayUser(store){
      let {name,photoURL,uid} = store.user
      store.playUser.push({name,photoURL,uid})
    },
    clearUser(store){
      store.user = null
    },
    ...firebaseMutations
  },
  actions: {
    loginUser({ commit, dispatch },user){
      commit('saveUser',user)
      dispatch('setAllUsersRef',db.collection('playUser'))
      commit('addMeToPlayUser')
    },
    logoutUser({ commit }){
      commit('clearUser')
    },
    setAllUsersRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('playUser', ref)
    })
  }
})
