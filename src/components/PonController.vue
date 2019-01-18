<template>
  <div>
    <PonCanvas
      :isAuto="isAuto"
      :player1Y="player1Y"
      :player2Y="player2Y"
      @mousemove.native="mousemove($event)"
      @moveball="moveball"></PonCanvas>
  </div>
</template>

<script>
import PonCanvas from '@/components/PonCanvas.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')

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
  methods : {
    mousemove(event) {
      if(this.isAuto){ return }
      this.moveRacket(event.offsetY)
    },
    moveRacket(y){
      if(this.isPlayer1) {
        this.player1Y = y
        return
      }
      this.player2Y = y
    },
    moveball(x,y){
      console.log(x,y)
      if(this.isAuto){ this.autoPlayer1(y) }
      this.autoPlayer2(y)
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
