import Vue from 'vue'

const vue = new Vue()
// 全局事件处理器
Vue.prototype.$globalEvent = vue

interface GlobalEvent {
  changeLogic: string
  resetValue: string
  addQuestion: string
}

export default GlobalEvent
const $event: GlobalEvent = {
  changeLogic: 'changeLogic',
  resetValue: 'resetValue',
  addQuestion: 'addQuestion',
}
Vue.prototype.$event = $event
