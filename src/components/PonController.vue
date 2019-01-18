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

export default {
  components: {
    PonCanvas
  },
  props : { isAuto:Boolean },
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
      this.player1Y = event.offsetY
    },
    moveball(x,y){
      console.log(x,y)
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
