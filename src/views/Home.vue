<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <hr>
    <b-col class="mt-2">
      <b-row class="justify-content-center">
        <b-button class="btn-social btn-github">
          <font-awesome-icon :icon="['fab','github']" class="m-1"/>Sign in with Github
        </b-button>
      </b-row>
    </b-col>
    <b-col class="mt-2">
      <b-row class="justify-content-center">
        <b-button class="btn-social btn-twitter">
          <font-awesome-icon :icon="['fab','twitter']" class="m-1"/>Sign in with Twitter
        </b-button>
      </b-row>
    </b-col>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>
<style>
.m-4px {
  margin-top: 4px;
}
</style>
