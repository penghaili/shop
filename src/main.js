import Vue from 'vue'
import App from './App.vue'
//引用路由配置
import router from './router/router'
//import './assets/reset.css'
import './assets/style.css'
import './css/fonts/iconfont.css'
Vue.config.productionTip = false
//引用数据请求模块
import http from './utils/request.js'
Vue.use(http)
//lazyload plugin
import LazyLoad from 'vue-lazyload'
Vue.use(LazyLoad,{
  loading:'/src/assets/images/loading.jpg'
})
//引用Vuex
//import Store from './store/store.js'
//引用验证组件
import VueLidate from 'vuelidate'
Vue.use(VueLidate)
new Vue({
  el: '#app',
  router,
  //store:Store,
  render: h => h(App)
})

