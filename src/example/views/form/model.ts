import { Schema } from '@/components/form/form.model'
import { requiredRuleProp } from '@/components/fns/fns'

const cascaderOptions = [
  {
    value: 'zhinan',
    label: '指南',
    children: [ {
      value: 'shejiyuanze',
      label: '设计原则',
      children: [ {
        value: 'yizhi',
        label: '一致',
      }, {
        value: 'fankui',
        label: '反馈',
      }, {
        value: 'xiaolv',
        label: '效率',
      }, {
        value: 'kekong',
        label: '可控',
      } ],
    }, {
      value: 'daohang',
      label: '导航',
      children: [ {
        value: 'cexiangdaohang',
        label: '侧向导航',
      }, {
        value: 'dingbudaohang',
        label: '顶部导航',
      } ],
    } ],
  }, {
    value: 'zujian',
    label: '组件',
    children: [ {
      value: 'basic',
      label: 'Basic',
      children: [ {
        value: 'layout',
        label: 'Layout 布局',
      }, {
        value: 'color',
        label: 'Color 色彩',
      }, {
        value: 'typography',
        label: 'Typography 字体',
      }, {
        value: 'icon',
        label: 'Icon 图标',
      }, {
        value: 'button',
        label: 'Button 按钮',
      } ],
    }, {
      value: 'form',
      label: 'Form',
      children: [ {
        value: 'radio',
        label: 'Radio 单选框',
      }, {
        value: 'checkbox',
        label: 'Checkbox 多选框',
      }, {
        value: 'input',
        label: 'Input 输入框',
      }, {
        value: 'input-number',
        label: 'InputNumber 计数器',
      }, {
        value: 'select',
        label: 'Select 选择器',
      }, {
        value: 'cascader',
        label: 'Cascader 级联选择器',
      }, {
        value: 'switch',
        label: 'Switch 开关',
      }, {
        value: 'slider',
        label: 'Slider 滑块',
      }, {
        value: 'time-picker',
        label: 'TimePicker 时间选择器',
      }, {
        value: 'date-picker',
        label: 'DatePicker 日期选择器',
      }, {
        value: 'datetime-picker',
        label: 'DateTimePicker 日期时间选择器',
      }, {
        value: 'upload',
        label: 'Upload 上传',
      }, {
        value: 'rate',
        label: 'Rate 评分',
      }, {
        value: 'form',
        label: 'Form 表单',
      } ],
    }, {
      value: 'data',
      label: 'Data',
      children: [ {
        value: 'table',
        label: 'Table 表格',
      }, {
        value: 'tag',
        label: 'Tag 标签',
      }, {
        value: 'progress',
        label: 'Progress 进度条',
      }, {
        value: 'tree',
        label: 'Tree 树形控件',
      }, {
        value: 'pagination',
        label: 'Pagination 分页',
      }, {
        value: 'badge',
        label: 'Badge 标记',
      } ],
    }, {
      value: 'notice',
      label: 'Notice',
      children: [ {
        value: 'alert',
        label: 'Alert 警告',
      }, {
        value: 'loading',
        label: 'Loading 加载',
      }, {
        value: 'message',
        label: 'Message 消息提示',
      }, {
        value: 'message-box',
        label: 'MessageBox 弹框',
      }, {
        value: 'notification',
        label: 'Notification 通知',
      } ],
    }, {
      value: 'navigation',
      label: 'Navigation',
      children: [ {
        value: 'menu',
        label: 'NavMenu 导航菜单',
      }, {
        value: 'tabs',
        label: 'Tabs 标签页',
      }, {
        value: 'breadcrumb',
        label: 'Breadcrumb 面包屑',
      }, {
        value: 'dropdown',
        label: 'Dropdown 下拉菜单',
      }, {
        value: 'steps',
        label: 'Steps 步骤条',
      } ],
    }, {
      value: 'others',
      label: 'Others',
      children: [ {
        value: 'dialog',
        label: 'Dialog 对话框',
      }, {
        value: 'tooltip',
        label: 'Tooltip 文字提示',
      }, {
        value: 'popover',
        label: 'Popover 弹出框',
      }, {
        value: 'card',
        label: 'Card 卡片',
      }, {
        value: 'carousel',
        label: 'Carousel 走马灯',
      }, {
        value: 'collapse',
        label: 'Collapse 折叠面板',
      } ],
    } ],
  }, {
    value: 'ziyuan',
    label: '资源',
    children: [ {
      value: 'axure',
      label: 'Axure Components',
    }, {
      value: 'sketch',
      label: 'Sketch Templates',
    }, {
      value: 'jiaohu',
      label: '组件交互文档',
    } ],
  } ]

export const allSchema: Schema[] = [
  {
    label: '普通文本',
    prop: 'name',
    placeholder: '这是自定义的placeholder',
    nodeProperty: {
      class: 'xxx',
    },
    initValue: '赋初始值', // 赋一个写死的初始值
    formItemProps: {
      rules: [
        { required: true },
        { max: 6, min: 2 },
      ],
    },
  },
  {
    label: '数字框',
    prop: 'number',
    comp: 'number',
    ...requiredRuleProp,
    nodeProperty: {
      class: 'xxx',
    },
  },
  {
    label: '文本域',
    prop: 'textarea',
    props: {
      type: 'textarea',
    },
    placeholder: '这是自定义的placeholder',
  },
  {
    label: '日期框',
    prop: 'date',
    comp: 'date',
    props: {
      type: 'date',
    },
  },
  {
    label: '年份框',
    prop: 'year',
    comp: 'date',
    props: {
      type: 'year',
    },
  },
  {
    label: '月份框',
    prop: 'month',
    comp: 'date',
    props: {
      type: 'month',
    },
  },
  {
    label: '多个日期框',
    prop: 'dates',
    comp: 'date',
    props: {
      type: 'dates',
    },
  },
  {
    label: '星期框',
    prop: 'week',
    comp: 'date',
    props: {
      type: 'week',
    },
  },
  {
    label: '时间框',
    prop: 'datetime',
    comp: 'date',
    props: {
      type: 'datetime',
    },
  },
  {
    label: '月份范围框',
    prop: 'monthRange',
    comp: 'date',
    startProp: 'startMonthRange',
    endProp: 'endMonthRange',
    props: {
      type: 'monthrange',
      startPlaceholder: '开始',
      endPlaceholder: '结束',
    },
  },
  {
    label: '日期范围框',
    prop: 'dateRange',
    comp: 'date',
    startProp: 'startDate',
    endProp: 'endDate',
    props: {
      type: 'daterange',
      startPlaceholder: '开始',
      endPlaceholder: '结束',
    },
  },
  {
    label: '时间范围框',
    prop: 'datetimeRange',
    comp: 'date',
    startProp: 'startDateTime',
    endProp: 'endDateTime',
    props: {
      type: 'datetimerange',
      startPlaceholder: '开始',
      endPlaceholder: '结束',
    },
  },
  {
    label: '选择框',
    prop: 'select',
    comp: 'select',
    initValue: '2',
    nodeProperty: {
      // 这种绑定无法访问this
      on: {
        change (val: any) {
          console.log(val, 'on')
        },
      },
    },
    props: {
      options: [
        {
          id: '1',
          label: '选项一',
        },
        {
          id: '2',
          label: '选项二',
        },
      ],
    },
  },
  {
    label: '多选框',
    prop: 'mulSelect',
    comp: 'select',
    props: {
      options: [
        {
          id: '1',
          label: '选项一',
        },
        {
          id: '2',
          label: '选项二',
        },
      ],
      multiple: true,
    },
  },
  {
    label: '单选组',
    prop: 'radio',
    comp: 'radio',
    initValue: '1',
    props: {
      options: [
        {
          id: '1',
          label: '选项一',
        },
        {
          id: '2',
          label: '选项二',
        },
      ],
    },
  },
  {
    label: '多选组',
    prop: 'checkbox',
    comp: 'checkbox',
    // initValue: ['1'],
    props: {
      options: [
        {
          id: '1',
          label: '选项一',
        },
        {
          id: '2',
          label: '选项二',
        },
      ],
    },
  },
  {
    label: '级联选择',
    prop: 'cascader',
    comp: 'cascader',
    props: {
      options: cascaderOptions,
    },
  },
  {
    label: '开关',
    prop: 'switch',
    comp: 'switch',
    initValue: false,
  },
  {
    label: '滑块',
    prop: 'slider',
    comp: 'slider',
  },
  {
    label: '上传',
    prop: 'upload',
    comp: 'upload',
    props: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      'list-type': 'picture-card',
      'on-success' () {},
      'on-remove' () {},
    },
  },
  {
    label: '评分',
    prop: 'rate',
    comp: 'rate',
  },
  {
    label: '颜色选择器',
    prop: 'color',
    comp: 'color',
  },
  {
    label: '穿梭框',
    prop: 'transfer',
    comp: 'transfer',
    props: {
      data: Array(15).fill(0).map((item, i) => ({
        key: i, label: `备选项${ i }`, disabled: i % 4 === 0,
      })),
    }
  },
]
