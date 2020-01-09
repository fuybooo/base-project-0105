import Login from '@/modules/login/views/Login'
import { ProRouteConfig } from '@/router/route.model'
import exampleRoutes from '@/example/router'
import frameRoutes from '@/modules/frame/router'

const routes: ProRouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      needNotToken: true,
    },
  },
  ...frameRoutes,
  ...exampleRoutes,
  {
    path: '*',
    name: '*',
    redirect: { name: 'login' },
    meta: {
      title: '*',
    },
  },
]
export default routes
