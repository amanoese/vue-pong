<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import firebase from 'firebase'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')

export default {
  name: 'App',
  created() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('login Firebase')
      if(!user) { return }
      this.loginUser(user)
    })
  },
  methods : {
    ...mapActions(['loginUser'])
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
