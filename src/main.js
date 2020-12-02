import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import store from './store'
import toast from 'components/common/toast'
import router from './router/index'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
