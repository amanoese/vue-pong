import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/fontawesome'
import Vuesax from 'vuesax'
import App from './App.vue'

import 'bootstrap-social/bootstrap-social.css';
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuesax)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
