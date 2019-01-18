<template>
  <div id="game">
    <PonController :isAuto="isAuto" :isPlayer1="isPlayer1"></PonController>
    <vs-row vs-justify="center" vs-align="center" class="mt-2">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
        <label for="">Player Auto</label>
        <vs-switch v-model="isAuto"/>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import PonController from '@/components/PonController.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState:mapStateUser } = createNamespacedHelpers('user')
const { mapActions:mapActionsGame } = createNamespacedHelpers('game')

export default {
  name: 'game',
  props : { playerId: String },
  data(){
    return {
      isAuto: false
    }
  },
  computed : {
    ...mapStateUser(['photoUrl','user']),
    isPlayer1(){
      console.log('user',this.user)
      return  this.playerId === 'computer' || this.user && this.playerId === this.user.uid
    },
  },
  watch : {
    user(){
      console.log('initGame user',this.user)
      this.initGame({user:this.user,ballId:this.playerId})
    }
  },
  methods : {
    ...mapActionsGame(['initGame'])
  },
  components: {
    PonController
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
