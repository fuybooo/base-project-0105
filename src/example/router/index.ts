import { ProRouteConfig } from '@/router/route.model'
import Example from '@/example/views'
import NormalHttpExample from '@/example/views/http/NormalHttp'
import Test1Example from '@/example/views/test/Test1'
import LayoutExample from '@/example/views/layout/Layout'
import TableExample from '@/example/views/table'
import BaseTableExample from '@/example/views/table/BaseTableExample'
import FormTableExample from '@/example/views/table/FormTableExample'
import FormExample from '@/example/views/form'
import BaseFormExample from '@/example/views/form/BaseFormExample'
import AllFormExample from '@/example/views/form/AllFormExample'
import SlotFormExample from '@/example/views/form/SlotFormExample'
import LoopFormExample from '@/example/views/form/LoopFormExample'
import MultiFuncFormExample from '@/example/views/form/MultiFuncFormExample'
import DialogExample from '@/example/views/dialog'
import BaseDialogExample from '@/example/views/dialog/BaseTableExample'
import rn from '@/router/router.name'

const routes: ProRouteConfig[] = [
  {
    path: '/example',
    ...rn.example,
    component: Example,
    redirect: rn.exTable,
    children: [
      {
        path: 'table',
        ...rn.exTable,
        component: TableExample,
        redirect: rn.exBaseTable,
        meta: {
          title: '表格示例',
        },
        children: [
          {
            path: 'baseTable',
            ...rn.exBaseTable,
            component: BaseTableExample,
            meta: {
              title: '基础表格示例',
            },
          },
          {
            path: 'formTable',
            ...rn.exFormTable,
            component: FormTableExample,
            meta: {
              title: '表单表格示例',
            },
          },
        ],
      },
      {
        path: 'form',
        ...rn.exForm,
        component: FormExample,
        redirect: rn.exBaseForm,
        meta: {
          title: '表单示例',
        },
        children: [
          {
            path: 'baseForm',
            ...rn.exBaseForm,
            component: BaseFormExample,
            meta: {
              title: '基础表单示例',
            },
          },
          {
            path: 'allForm',
            ...rn.exAllForm,
            component: AllFormExample,
            meta: {
              title: '全部控件表单示例',
            },
          },
          {
            path: 'slotForm',
            ...rn.exSlotForm,
            component: SlotFormExample,
            meta: {
              title: 'slot表单示例',
            },
          },
          {
            path: 'loopForm',
            ...rn.exLoopForm,
            component: LoopFormExample,
            meta: {
              title: '多个表单示例',
            },
          },
          {
            path: 'multiFuncForm',
            ...rn.exMultiFuncForm,
            component: MultiFuncFormExample,
            meta: {
              title: '多功能表单示例',
            },
          },
        ],
      },
      {
        path: 'dialog',
        ...rn.exDialog,
        component: DialogExample,
        redirect: rn.exBaseDialog,
        meta: {
          title: '弹出层示例',
        },
        children: [
          {
            path: 'baseDialog',
            ...rn.exBaseDialog,
            component: BaseDialogExample,
            meta: {
              title: '基础弹出层示例',
            },
          },
        ],
      },
      {
        path: 'normalHttp',
        ...rn.exNormalHttp,
        component: NormalHttpExample,
        meta: {
          title: '普通请求示例',
        },
      },
      {
        path: 'layout',
        ...rn.exLayout,
        component: LayoutExample,
        meta: {
          title: '布局测试',
        },
      },
      {
        path: 'test1',
        ...rn.exTest1,
        component: Test1Example,
        meta: {
          title: '简单的测试',
        },
      },
    ],
    meta: {
      title: '示例',
      needNotToken: true,
    },
  },
]
export default routes
