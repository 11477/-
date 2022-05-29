import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import user from './store/user';

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://43.138.86.76/api';

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

router.beforeEach((to, from, next) => {
  //此处获取登陆的用户信息，参考 store/index.js and user.js
  const userInfo = user.getters.getUser(user.state())

  //要求登录后不能访问的页面
  if (userInfo && to.meta.requireNotAuth) {
    next({
      name: 'HomeView',
    })
  }
  //邮箱验证后不能访问的页面 如再次验证邮箱
  if (userInfo && userInfo.user.confirmed && to.meta.requireAuthNotConfirmed) {
    next({
      name: 'HomeView',
    })
  }

  //其它情况不拦截
  next()
})
