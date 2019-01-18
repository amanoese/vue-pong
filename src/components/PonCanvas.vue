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
  <!--<SvgBox v-if="play" :x="nBallX" :y="nBallY" :width="ballSize" :height="ballSize" color="rgba(255,255,255,0.5)"></SvgBox>-->
  <rect x="0" y="0" width="720" height="480" stroke-width="0" fill="rgba(0,0,0,0)"
    @click="gameClick" />
</svg>
</template>

<script>
import SvgBox from './SvgBox.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('game')

export default {
  name: 'pon-canvas',
  components: { SvgBox },
  props: {
    isPlayer1:Boolean,
    player1Y : { type:Number, default : 100 },
    player2Y : { type:Number, default : 100 },
  },
  data() {
    return {
      racketWidth: 10,
      racketHeight: 50,
      tableHeight: 480,
      tableWidth: 720,

      player1Point: 0,
      player2Point: 0,
      timerId: NaN,

      player1X : 50,
      player2X : 680,

      play : false,
      ballSize : 10,
      ballX : -1,
      ballY : -1,
      accelerationX: -5,
      accelerationY: -5,

      //nBallX : -1,
      //nBallY : -1,

    }
  },
  computed: {
    ...mapState(['ball']),
    isMyBall(){
      return (
        this.isPlayer1 &&
          (  (this.ballX < this.tableWidth*3/4 && this.accelerationX < 0)
          || (this.ballX < this.tableWidth*1/4 && 0 < this.accelerationX))
        )
    },
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
    ball({ ballX, ballY, accelerationX, accelerationY, ballSize, play}){
      if(!this.play || this.isMyBall && ballX){ return }
      console.log('ball for Firebase')
      this.play = play
      this.ballX         = ballX
      this.ballY         = ballY
      this.accelerationX = accelerationX
      this.accelerationY = accelerationY
      this.ballSize      = ballSize
    },
    play(){
      this.gameInterval()
    }
  },
  methods : {
    ...mapActions(['updateBall']),
    gameClick(){
      if(this.play){
        this.gameStop()
        return
      }
      this.gameStart()
    },
    gameStart(){
      this.play = true
      this.ballY = Math.random() * this.tableHeight
      this.ballX = this.tableWidthHerf
      this.accelerationY *= (Math.random() > 0.5) ? 1 : -1
      this.syncBall()
    },
    gameStop(){
      this.play = false
      this.syncBall()
      //clearTimeout(this.timerId)
    },
    gameInterval(){
      if(!this.play){ return }

      this.moveBall()
      this.boundBall()
      let [x,y] = this.nSeccondAfterBall(20)
      //this.nBallX = x
      //this.nBallY = y
      this.isGaol()

      this.timerId = setTimeout(()=>this.gameInterval(),25)
    },
    ballPos: function ballPos(t,ballX,ballY,accelerationX,accelerationY,tableHeight){
      return t <= 0 ? [ballX,ballY] :
        Math.abs(ballY - tableHeight/2 ) <= tableHeight/2 ?
          ballPos(t - 1,ballX + accelerationX,ballY + accelerationY,accelerationX,accelerationY,tableHeight) :
          ballPos(t - 1,ballX + accelerationX,ballY - accelerationY,accelerationX,-accelerationY,tableHeight)
    },
    nSeccondAfterBall(n){
      return this.ballPos(
          n
          ,this.ballX
          ,this.ballY
          ,this.accelerationX
          ,this.accelerationY
          ,this.tableHeight)
   },
    moveBall(){
      this.ballX += this.accelerationX
      this.ballY += this.accelerationY
      this.$emit('moveball',this.ballX,this.ballY)

      if(this.isMyBall){
        this.syncBall()
      }
    },
    syncBall(){
      this.updateBall({
        play          : this.play,
        ballX         : this.ballX,
        ballY         : this.ballY,
        accelerationX : this.accelerationX,
        accelerationY : this.accelerationY,
        ballSize      : this.ballSize,
      })
    },
    hitBox([x,y,w,h],[x_2,y_2,w_2,h_2]){
      return Math.abs(x - x_2) < w/2 + w_2/2
          && Math.abs(y - y_2) < h/2 + h_2/2
    },
    boundBall(){
      if(this.hitBox([this.player1X,this.player1Y,1,this.racketHeight],[this.ballX,this.ballY,this.ballSize,this.ballSize])
      || this.hitBox([this.player2X,this.player2Y,1,this.racketHeight],[this.ballX,this.ballY,this.ballSize,this.ballSize])){
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
    }
  }
}
</script>
