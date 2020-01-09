import { ProRouteConfig } from '@/router/route.model'
import Personal from '@/modules/personal/views/Personal'

const routes: ProRouteConfig[] = [
  {
    path: 'personal',
    name: 'personal',
    component: Personal,
    meta: {
      title: '个人中心',
    },
  },
]
export default routes
