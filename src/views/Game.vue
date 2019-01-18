<template>
  <div id="game">
    <PonController :isAuto="isAuto" :isPlayer1="isPlayer1"></PonController>
    <vs-row vs-justify="center" vs-align="center" class="mt-2">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
        <label for="">Player1 Auto </label>
        <vs-switch v-model="isAuto"/>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PonController from '@/components/PonController.vue'

export default {
  name: 'game',
  props : { playerId: String },
  data(){
    return {
      isAuto: false
    }
  },
  computed : {
    isPlayer1(){
      return this.playerId === this.user.uid || this.playerId === 'computer'
    },
    ...mapState(['photoUrl','user'])
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
