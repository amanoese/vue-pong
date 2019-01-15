import Vue from 'vue'
import Vuesax from 'vuesax'
import App from './App.vue'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuesax)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
