import { ProRouteConfig } from '@/router/route.model'
import Frame from '@/modules/frame/views/Frame'
import homeRoutes from '@/modules/home/router'
import personalRoutes from '@/modules/personal/router'
import exampleRoutes from '@/example/router'

const routes: ProRouteConfig[] = [
  {
    path: '/main',
    name: 'main',
    component: Frame,
    children: [
      ...homeRoutes,
      ...personalRoutes,
      ...exampleRoutes,
    ],
    meta: {
      title: '主页面',
    },
  },
]
export default routes
