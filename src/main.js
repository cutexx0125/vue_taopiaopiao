import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import axios from 'axios'

import 'mint-ui/lib/style.css'
import './assets/css/common.css'
import './assets/css/swiper.min.css'

Vue.config.productionTip = false

Vue.use(Mint)

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://172.20.10.3:9090'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
