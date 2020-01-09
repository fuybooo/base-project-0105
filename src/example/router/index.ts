import { ProRouteConfig } from '@/router/route.model'
import Example from '@/example/views'
import BaseTableExample from '@/example/views/table/BaseTableExample'
import NormalHttpExample from '@/example/views/http/NormalHttp'
import Test1Example from '@/example/views/test/Test1'
import LayoutExample from '@/example/views/layout/Layout'

const routes: ProRouteConfig[] = [
  {
    path: '/example',
    name: 'example',
    component: Example,
    children: [
      {
        path: 'table',
        name: 'ex-table',
        component: BaseTableExample,
        meta: {
          title: '表格示例'
        }
      },
      {
        path: 'normalHttp',
        name: 'ex-normalHttp',
        component: NormalHttpExample,
        meta: {
          title: '普通请求示例'
        }
      },
      {
        path: 'layout',
        name: 'ex-layout',
        component: LayoutExample,
        meta: {
          title: '布局测试'
        }
      },
      {
        path: 'test1',
        name: 'ex-test1',
        component: Test1Example,
        meta: {
          title: '简单的测试'
        }
      },
    ],
    meta: {
      title: '示例',
      needNotToken: true,
    },
  },
]
export default routes
