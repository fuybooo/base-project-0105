import { ProRouteConfig } from '@/router/route.model'
import Home from '@/modules/home/views/Home'

const routes: ProRouteConfig[] = [
  {
    path: 'home',
    name: 'home',
    component: Home,
    meta: {
      title: '示例',
    },
  },
]
export default routes
