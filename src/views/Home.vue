<template>
  <div>
    <b-jumbotron>
      <template slot="header">
        Welcome! Vue.js App
      </template>
      <template slot="lead">
        <b-row class="justify-content-center">
          <b-img thumbnail :src="photoURL" alt="center image" width="200" height="200"/>
        </b-row>
      </template>
    </b-jumbotron>
    <b-container class="p-4">
      <h1>select player</h1>
      <b-list-group v-for="user in playUser" class="mt-3">
        <b-list-group-item href="/game">
          <b-row>
            <b-col class="text-right">
              <b-img thumbnail :src="user.photoURL" alt="photo image" width="50" height="50"/>
            </b-col>
            <b-col class="text-left"> {{user.name}} </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name : 'home',
  computed : {
    ...mapState(['photoURL','playUser'])
  },
}
</script>
