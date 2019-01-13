<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <br>
    <PonCanvas :isAuto="isAuto"></PonCanvas>
    <br>
    <vs-row vs-justify="center" vs-align="center" >
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
        <label for="">Player1 Auto </label>
        <vs-switch v-model="isAuto"/>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import PonCanvas from './components/PonCanvas.vue'

export default {
  name: 'app',
  data(){
    return {
      isAuto: false
    }
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
