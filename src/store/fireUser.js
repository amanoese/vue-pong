import { firebaseMutations, firebaseAction } from 'vuexfire'
import { db } from '@/plugins/vuefire.js'

export default {
  namespaced: true,
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
    clearUser(store){
      store.user = null
    },
    ...firebaseMutations
  },
  actions: {
    loginUser({ state, commit, dispatch },user){
      let {name="",photoURL="",uid=""} = user

      commit('saveUser',user)
      let collection = db.collection('playUser')
      dispatch('setAllUsersRef',collection)
      collection.add({name,photoURL,uid})
    },
    logoutUser({ commit }){
      commit('clearUser')
    },
    setAllUsersRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('playUser', ref)
    })
  }
}
