<template>
<svg width="720" height="480">
  <rect x="0" y="0" width="720" height="480" stroke-width="0" fill="black" />
  <line x1="365" y1="10" x2="365" y2="720" stroke-width="10" stroke="white" stroke-dasharray="20 20" />

  <SvgBox :x="player1X" :y="mouseY" :width="racketWidth" :height="racketHeight"></SvgBox>
  <SvgBox :x="player2X" :y="player2Y" :width="racketWidth" :height="racketHeight"></SvgBox>

  <SvgBox :x="ballX" :y="ballY" :width="ballSize" :height="ballSize"></SvgBox>
  <rect x="0" y="0" width="720" height="480" stroke-width="0" fill="rgba(0,0,0,0)"
    @keyup="keyup()"
    @click="moveBall()"
    @mousemove="mousemove($event)" />
</svg>
</template>

<script>
import SvgBox from './SvgBox.vue'

export default {
  name: 'pon-canvas',
  components: { SvgBox },
  mounted(){
    setInterval(this.moveBall.bind(this),25)
  },
  data() {
    return {
      racketWidth: 10,
      racketHeight: 50,
      tableHeight: 480,
      tableWidth: 720,

      mouseY : 0,
      player1X : 50,
      player2X : 680,
      player2Y : 100,


      ballX : 360,
      ballY : 290,
      ballSize : 10,
      accelerationX: -5,
      accelerationY: -5
    }
  },
  computed: {
    tableHeightHerf (){
      return this.tableHeight / 2
    },
    tableWidthHerf (){
      return this.tableWidth / 2
    },
    ballSizeHerf(){
      return this.ballSize / 2
    }
  },
  methods : {
    mousemove(event) {
      this.mouseY = event.offsetY
    },
    keyup(){
      //console.log('keyup!')
    },
    moveBall(){
      this.ballX += this.accelerationX
      this.ballY += this.accelerationY
      this.autoPlayer2()
      this.boundBall()
    },
    hitBox([x,y,w,h],[x_2,y_2,w_2,h_2]){
      return Math.abs(x - x_2) < w/2 + w_2/2
          && Math.abs(y - y_2) < h/2 + h_2/2
    },
    boundBall(){
      if( this.tableWidthHerf < Math.abs(this.ballX - this.tableWidthHerf)
      || this.hitBox([this.player1X,this.mouseY,this.racketWidth,this.racketHeight],[this.ballX,this.ballY,this.ballSize,this.ballSize])
      || this.hitBox([this.player2X,this.player2Y,this.racketWidth,this.racketHeight],[this.ballX,this.ballY,this.ballSize,this.ballSize])){
        this.accelerationX *= -1
      }
      if( this.tableHeightHerf < Math.abs(this.ballY - this.tableHeightHerf)){
        this.accelerationY *= -1
      }
    },
    autoPlayer2(){
      this.player2Y += (this.ballY - this.player2Y > 0 ? 4.5 : -4.5)
    }
  }
}
</script>
