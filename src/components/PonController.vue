<template>
  <div>
    <PonCanvas
      :player1Y="c_player1Y()"
      :player2Y="c_player2Y()"
      :isPlayer1="isPlayer1"
      @mousemove.native="mousemove($event)"
      @moveball="moveball"></PonCanvas>
  </div>
</template>

<script>
import PonCanvas from '@/components/PonCanvas.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('game')

export default {
  components: {
    PonCanvas
  },
  props : { isAuto:Boolean, isPlayer1:Boolean },
  data(){
    return {
      player1Y : 100,
      player2Y : 100,
      play : false
    }
  },
  computed : {
    ...mapState({
      firePlayer1: 'player1',
      firePlayer2: 'player2',
    }),
  },
  methods : {
    ...mapActions(['setBallRef', 'updatePlayer1', 'updatePlayer2']),
    c_player1Y(){
      return this.isPlayer1 ? this.player1Y : this.firePlayer1.y
    },
    c_player2Y(){
      return !this.isPlayer1 ? this.player2Y : this.firePlayer2.y
    },
    mousemove(event) {
      if(this.isAuto){ return }
      this.moveRacket(event.offsetY)
    },
    moveRacket(y){
      if(this.isPlayer1) {
        this.player1Y = y
        this.updatePlayer1({y})
        return
      }
      this.player2Y = y
      this.updatePlayer2({y})
    },
    moveball(x,y){
      if(this.isAuto &&  this.isPlayer1){ this.autoPlayer1(y) }
      if(this.isAuto && !this.isPlayer1){ this.autoPlayer2(y) }
    },
    autoPlayer1(ballY){
      this.player1Y += (ballY - this.player1Y > 0 ? 4.5 : -4.5)
    },
    autoPlayer2(ballY){
      this.player2Y += (ballY - this.player2Y > 0 ? 4.5 : -4.5)
    }
  },

}
</script>
