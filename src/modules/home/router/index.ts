import { ProRouteConfig } from '@/router/route.model'
import Home from '@/modules/home/views/Home'
import rn from '@/router/router.name'

const routes: ProRouteConfig[] = [
  {
    path: 'home',
    ...rn.home,
    component: Home,
    meta: {
      title: '首页',
    },
  },
]
export default routes
