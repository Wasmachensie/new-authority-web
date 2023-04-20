// 导入Element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Vue from "vue"
import App from './App'
// 导入路由拦截
import "./perimission.js"
import router from "./router"
import store from "./store"

import '@/assets/styles/index.scss'
import './assets/icons'

Vue.config.productionTip = false

// 使用ElmentUI
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')