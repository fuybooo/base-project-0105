import { ProRouteConfig } from '@/router/route.model'
import Personal from '@/modules/personal/views/Personal'
import rn from '@/router/router.name'

const routes: ProRouteConfig[] = [
  {
    path: 'personal',
    ...rn.personal,
    component: Personal,
    meta: {
      title: '个人中心',
    },
  },
]
export default routes
