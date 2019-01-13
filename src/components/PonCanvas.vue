<template>
<svg width="720" height="480">
  <rect x="0" y="0" width="720" height="480" stroke-width="0" fill="black" />
  <line x1="365" y1="10" x2="365" y2="720" stroke-width="10" stroke="white" stroke-dasharray="20 20" />
  <text :x="tableWidth/4 - 25"  y="100" font-size="100" fill="white">{{player1Point}}</text>
  <text :x="tableWidth*3/4 - 25" y="100" font-size="100" fill="white">{{player2Point}}</text>

  <text v-if="!play" :x="130" :y="tableHeight/2" font-size="100" fill="white">Click Start!</text>

  <SvgBox :x="player1X" :y="player1Y" :width="racketWidth" :height="racketHeight"></SvgBox>
  <SvgBox :x="player2X" :y="player2Y" :width="racketWidth" :height="racketHeight"></SvgBox>

  <SvgBox v-if="play" :x="ballX" :y="ballY" :width="ballSize" :height="ballSize"></SvgBox>
  <rect x="0" y="0" width="720" height="480" stroke-width="0" fill="rgba(0,0,0,0)"
    @keyup="keyup()"
    @click="gameStart()"
    @mousemove="mousemove($event)" />
</svg>
</template>

<script>
import SvgBox from './SvgBox.vue'

export default {
  name: 'pon-canvas',
  components: { SvgBox },
  props:{
    isAuto: { type: Boolean, default : false }
  },
  data() {
    return {
      racketWidth: 10,
      racketHeight: 50,
      tableHeight: 480,
      tableWidth: 720,

      player1X : 50,
      player2X : 680,
      player1Y : 100,
      player2Y : 100,

      player1Point: 0,
      player2Point: 0,
      play : false,

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
  watch: {
    play(){
      this.gameInterval()
    }
  },
  methods : {
    gameStart(){
      if(this.play) { return }
      this.play = true
      this.ballY = Math.random() * this.tableHeight
      this.ballX = this.tableWidthHerf
      this.accelerationY *= (Math.random() > 0.5) ? 1 : -1
    },
    gameInterval(){
      if(!this.play){ return }

      this.moveBall()
      if(this.isAuto) { this.autoPlayer1() }
      this.autoPlayer2()
      this.boundBall()
      this.isGaol()
      setTimeout(this.gameInterval.bind(this),5)
    },
    mousemove(event) {
      if(this.isAuto){ return }
      this.player1Y = event.offsetY
    },
    keyup(){
      //console.log('keyup!')
    },
    moveBall(){
      this.ballX += this.accelerationX
      this.ballY += this.accelerationY
    },
    hitBox([x,y,w,h],[x_2,y_2,w_2,h_2]){
      return Math.abs(x - x_2) < w/2 + w_2/2
          && Math.abs(y - y_2) < h/2 + h_2/2
    },
    boundBall(){
      if(this.hitBox([this.player1X,this.player1Y,this.racketWidth,this.racketHeight],[this.ballX,this.ballY,this.ballSize,this.ballSize])
      || this.hitBox([this.player2X,this.player2Y,this.racketWidth,this.racketHeight],[this.ballX,this.ballY,this.ballSize,this.ballSize])){
        this.accelerationX *= -1
      }
      if( this.tableHeightHerf < Math.abs(this.ballY - this.tableHeightHerf)){
        this.accelerationY *= -1
      }
    },
    isGaol(){
      if(this.tableWidthHerf > Math.abs(this.ballX - this.tableWidthHerf)) { return }
      this.play = false
      this.ballX > 0 ? this.player1Point += 1 : this.player2Point += 1
      if(this.isAuto) {
        this.gameStart()
      }
    },
    autoPlayer1(){
      this.player1Y += (this.ballY - this.player1Y > 0 ? 4.5 : -4.5)
    },
    autoPlayer2(){
      this.player2Y += (this.ballY - this.player2Y > 0 ? 4.5 : -4.5)
    }
  }
}
</script>
