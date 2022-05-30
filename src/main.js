import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'


Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
axios.defaults.baseURL = "http://43.138.86.76/api/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.directive('title', {
  inserted: function (el) {
    document.title = el.dataset.title
  }
})
