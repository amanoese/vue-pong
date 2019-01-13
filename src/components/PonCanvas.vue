<template>
<svg width="720" height="480" fill="black">
  <rect x="0" y="0" width="720" height="480" stroke-width="0" fill="black" />
  <line x1="365" y1="10" x2="365" y2="720" stroke-width="10" stroke="white" stroke-dasharray="20 20" />
  <line x1="50" :y1="player1_Y1()" x2="50" :y2="player1_Y2()" stroke-width="10" stroke="white" />
  <line x1="680" y1="50" x2="680" y2="100" stroke-width="10" stroke="white" />
  <rect :x="ballX - ballSizeHerf" :y="ballY - ballSizeHerf" :width="ballSize" :height="ballSize" stroke-width="0" fill="white" />
  <rect x="0" y="0" width="720" height="480" stroke-width="0" fill="rgba(0,0,0,0)"
    @keyup="keyup()"
    @click="moveBall()"
    @mousemove="mousemove($event)" />
</svg>
</template>

<script>
export default {
  name: 'pon-canvas',
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
      player1_Height : 50,


      ballX : 10,
      ballY : 10,
      ballSize : 10,
      accelerationX: 5,
      accelerationY: 5
    }
  },
  computed: {
    tableHeight_1_2 (){
      return this.tableHeight / 2
    },
    tableWidth_1_2 (){
      return this.tableWidth / 2
    },
    ballSizeHerf(){
      return this.ballSize / 2
    }
  },
  methods : {
    player1_Y1() {
      return this.mouseY - (this.racketHeight / 2)
    },
    player1_Y2() {
      return this.player1_Y1() + this.racketHeight
    },
    mousemove(event) {
      this.mouseY = event.offsetY
    },
    keyup(){
      console.log('keyup!')
    },
    moveBall(){
      this.ballX += this.accelerationX
      this.ballY += this.accelerationY
      this.boundBall()
    },
    boundBall(){
      console.log(50 < this.ballX , this.ballX < 60 , this.player1_Y1 < this.ballY , this.ballY < this.player1_Y2)
      if(Math.abs(this.ballX - this.tableWidth_1_2) >= this.tableWidth_1_2 ||
        (50 < this.ballX && this.ballX < 60 && this.player1_Y1() < this.ballY && this.ballY < this.player1_Y2())){
        this.accelerationX *= -1
      }
      if(Math.abs(this.ballY - this.tableHeight_1_2) >= this.tableHeight_1_2){
        this.accelerationY *= -1
      }
    },
    autoPlayer2(){
      
    }
  }
}
</script>
