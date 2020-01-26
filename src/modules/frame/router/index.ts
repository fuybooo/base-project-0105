import { ProRouteConfig } from '@/router/route.model'
import Frame from '@/modules/frame/views/Frame'
import homeRoutes from '@/modules/home/router'
import personalRoutes from '@/modules/personal/router'
import exampleRoutes from '@/example/router'
import rn from '@/router/router.name'

const routes: ProRouteConfig[] = [
  {
    path: '/main',
    ...rn.main,
    component: Frame,
    redirect: rn.home,
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
