import Vue from 'vue'
// 导入样式文件
import '@/assets/scss/index.scss'
// 导入全局依赖
import '@/plugins/element'
import App from './App'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 引入基础组件
import '@/components'
// 事件发送
import '@/models/global-event/global-event'
// 请求
import '@/http/axios'
// 请求url
import '@/models/urls/urls'

Vue.config.productionTip = false

window._vueInstance_ = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
