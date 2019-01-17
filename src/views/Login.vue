<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <hr>
    <b-col class="mt-2">
      <b-row class="justify-content-center">
        <b-button class="btn-social btn-github" @click="loginGithub">
          <font-awesome-icon :icon="['fab','github']" class="m-1"/>Sign in with Github
        </b-button>
      </b-row>
    </b-col>
    <b-col class="mt-2">
      <b-row class="justify-content-center">
        <b-button class="btn-social btn-twitter" @click="loginTwitter">
          <font-awesome-icon :icon="['fab','twitter']" class="m-1"/>Sign in with Twitter
        </b-button>
      </b-row>
    </b-col>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import firebase from 'firebase'

export default {
  name: 'login',
  computed : mapState(['user']),
  watch:{
    user(user) {
      if(!user) { return }
      this.$router.push('home')
    }
  },
  methods : {
    loginGithub(){
      const provider = new firebase.auth.GithubAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    loginTwitter(){
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    ...mapActions(['loginUser'])
  }
}
</script>
<style>
.m-4px {
  margin-top: 4px;
}
</style>
