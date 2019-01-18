import { firebaseMutations, firebaseAction } from 'vuexfire'
import { db } from '@/plugins/vuefire.js'


export default {
  namespaced: true,
  state : {
    ballId : '',
    ball : {
      ballX : -1,
      ballY : -1,
      accelerationX: -5,
      accelerationY: -5,
      ballSize : 10
    },
    player1 : {
      uid: '',
      photoURL: '',
      y : 0
    },
    player2 : {
      uid: '',
      photoURL: '',
      y : 0
    }
  },
  mutations: {
    setBallId(state,id){
      state.ballId = id
    }
  },
  actions : {
    initGame({commit,dispatch},{user,ballId=undifind}){
      console.log('initGame')
      let ball = db.collection('Ball').doc(ballId)
      let id = ball.id

      let player1 = db.collection('Player1').doc(id)
      let player2 = db.collection('Player2').doc(id)

      commit('setBallId',id)
      dispatch('setBallRef',ball)
      dispatch('setPlayer1',player1)
      dispatch('setPlayer2',player2)
    },
    updateBall({state},ball){
      db.collection('Ball').doc(state.ballId).set({...state.ball,...ball})
    },
    updatePlayer1({state},user){
      db.collection('Player1').doc(state.ballId).set({...state.user,...user})
    },
    updatePlayer2({state},user){
      db.collection('Player2').doc(state.ballId).set({...state.user,...user})
    },
    setBallRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('ball', ref)
    }),
    setPlayer1: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('player1', ref)
    }),
    setPlayer2: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('player2', ref)
    })
  }
}
