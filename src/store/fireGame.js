import { firebaseMutations, firebaseAction } from 'vuexfire'
import { db } from '@/plugins/vuefire.js'


export default {
  namespaced: true,
  state : {
    ballId : '',
    player1Id : '',
    player2Id : '',
    ball : {
      ballX : -1,
      ballY : -1,
      accelerationX: -5,
      accelerationY: -5
      ballSize : 10,
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
    initGame({commit,dispatch},{user),ballId=undifind}){
      let { uid, photoURL} = user
      let _ballId = db.collection('Ball').doc(ballId)

      let player1 = db.collection('Player1').doc(_ballId)
      let player2 = db.collection('Player2').doc(_ballId)

      dispatch('setBallId',ballId)
      dispatch('setPlayer1',player1)
      dispatch('setPlayer2',player2)
    },
    async updatePlayer1({state},user){
      await db.collection('Player1').doc(state.ballId).set({...state.user,...user})
    },
    async updatePlayer2({state},user){
      await db.collection('Player2').doc(state.ballId).set({...state.user,...user})
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
