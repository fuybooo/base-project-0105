import { ProRouteConfig } from '@/router/route.model'
import Home from '@/modules/home/views/Home'

const routes: ProRouteConfig[] = [
  {
    path: 'home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
    },
  },
]
export default routes
