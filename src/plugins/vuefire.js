import Vue from 'vue'

import VueFire from 'vuefire'
import firebase from 'firebase'
import config from '@/../config/firebase.json'

// explicit installation required in module environments
Vue.use(VueFire)
firebase.initializeApp(config);

const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

export { db }
