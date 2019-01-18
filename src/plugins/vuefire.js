import Vue from 'vue'

import VueFire from 'vuefire'
import firebase from 'firebase'


// explicit installation required in module environments
Vue.use(VueFire)
firebase.initializeApp(JSON.parse(process.env.FIRE_CONFIG||'false')||import('@/../config/firebase.json'));

const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }

db.settings(settings)

export { db }
