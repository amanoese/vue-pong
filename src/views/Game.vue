<template>
  <div id="game">
    <PonCanvas :isAuto="isAuto"></PonCanvas>
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
import PonCanvas from '@/components/PonCanvas.vue'

export default {
  name: 'game',
  data(){
    return {
      isAuto: false
    }
  },
  computed : {
    ...mapState(['photoUrl'])
  },
  components: {
    PonCanvas
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
