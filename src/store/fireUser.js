import { firebaseMutations, firebaseAction } from 'vuexfire'
import { db } from '@/plugins/vuefire.js'

export default {
  namespaced: true,
  state: {
    user : null,
    name : '',
    photoURL : '',
    playUser : [],
    playUserCollection : null
  },
  getters : {
    playUser: state => [{ name: 'computer', uid: 'computer', matchup: true },...state.playUser]
  },
  mutations: {
    saveUser(state,user){
      state.user = user
      let {displayName:name, photoURL} = user
      state.name = name
      state.photoURL = user.photoURL
    },
    clearUser(state){
      state.user = null
    },
    bindPlayUserCollection(state,collection){
      state.playUserCollection = collection
    },
    ...firebaseMutations
  },
  actions: {
    async loginUser ({ state, commit, dispatch },user){
      let {name="",photoURL="",uid="",matchup=false} = user

      commit('saveUser',user)
      let collection = db.collection('playUser')
      await dispatch('setAllUsersRef',collection)
      commit('bindPlayUserCollection',collection)

      let doc = await state.playUserCollection.doc(uid).get()
      if(!doc.exists){
        console.log(`${uid} is not found`)
        state.playUserCollection.doc(uid).set({uid,name,photoURL,matchup})
      }
    },
    logoutUser({ commit }){
      commit('clearUser')
    },
    setAllUsersRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('playUser', ref)
    })
  }
}
