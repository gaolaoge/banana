import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import {store} from './store/store'

Vue.config.productionTip = false
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios
Vue.prototype.wangqiang = '/wangqiang'
Vue.prototype.jiabingqian = '/jiabingqian'

Vue.use(VueResource)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
