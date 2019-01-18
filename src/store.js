import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import user from '@/store/fireUser.js'
import game from '@/store/fireGame.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    game
  },
  mutations: {
    ...firebaseMutations
  }
})
