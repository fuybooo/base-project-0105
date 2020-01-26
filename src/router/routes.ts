import Login from '@/modules/login/views/Login'
import { ProRouteConfig } from '@/router/route.model'
import frameRoutes from '@/modules/frame/router'
import rn from '@/router/router.name'

const routes: ProRouteConfig[] = [
  {
    path: '/login',
    ...rn.login,
    component: Login,
    meta: {
      title: '登录',
      needNotToken: true,
    },
  },
  ...frameRoutes,
  {
    path: '*',
    name: '*',
    redirect: rn.login,
    meta: {
      title: '*',
    },
  },
]
export default routes
