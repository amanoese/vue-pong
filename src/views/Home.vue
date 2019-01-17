<template>
  <div>
    <b-jumbotron>
      <template slot="header">
        Welcome! Vue.js App
      </template>
      <template slot="lead">
        <b-row class="justify-content-center">
          <b-img thumbnail :src="photoUrl" alt="center image" width="200" height="200"/>
        </b-row>
      </template>
    </b-jumbotron>
    <b-container fluid class="p-4">
      <h1>select player</h1>
      <b-list-group class="mt-3">
        <b-list-group-item href="/game">vs Computer</b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name : 'home',
  computed : {
    ...mapState(['photoUrl'])
  },
}
</script>
