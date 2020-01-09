import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

Vue.use(VueRouter)

const originPush = VueRouter.prototype.push
// 解决重复路由跳转的问题
VueRouter.prototype.push = function push (location: any) {
  const res: any = originPush.call(this, location)
  if (res) {
    return res.catch(() => {})
  }
  return res
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})
router.beforeEach((to, from, next) => {
  // 设置标题
  // 检验是否登录
  next()
})

export default router
