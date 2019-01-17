import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/fontawesome'
import './plugins/vuefire'
import Vuesax from 'vuesax'
import App from './App.vue'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
import 'bootstrap-social/bootstrap-social.css';
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuesax)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
