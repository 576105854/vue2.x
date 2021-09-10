import Vue from 'vue'
import App from './App.vue'
import {Button} from "mint-ui";
import router from '@/router'
import store from '@/store'
import VueLazyload from "vue-lazyload";
import './filters'

import '@/mock/mockServer' //加载mockServer

//注册全局组件标签
Vue.component(Button.name, Button)
Vue.use(VueLazyload)

/*
入口js
 */

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
