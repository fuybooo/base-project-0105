import { ProRouteConfig } from '@/router/route.model'
import Frame from '@/modules/frame/views/Frame'
import homeRoutes from '@/modules/home/router'
import personalRoutes from '@/modules/personal/router'

const routes: ProRouteConfig[] = [
  {
    path: '/main',
    name: 'main',
    component: Frame,
    children: [
      ...homeRoutes,
      ...personalRoutes,
    ],
    meta: {
      title: '主页面',
    },
  },
]
export default routes
