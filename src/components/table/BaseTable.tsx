import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Column, defaultFilterSplit } from '@/components/table/table.model'
import { urlType } from '@/models/urls/url-util'
import { HttpRes, MIN_WIN_HEIGHT } from '@/models/common/models'
import { debounce, guid } from '@/util/fns/fns'
import { setProperty } from '@/components/fns/fns'
import { getClientHeight, getSpaceHeight } from '@/util/fns/fns-dom'
import './BaseTable.scss'
import { AxiosInstance } from 'axios'

@Component({})
export default class BaseTable extends Vue {
  /**
   * --------------------------------------------
   * 传入组件的属性
   * --------------------------------------------
   */
  @Prop({
    type: Array,
    required: true,
  })
  public columns!: Column[]
  /**
   * 若传了此属性，则表格变为简单表格
   */
  @Prop({})
  public data!: any[]
  @Prop({
    type: [ Object, String ],
  })
  public url!: urlType
  @Prop({
    type: Object,
    default () {
      return {}
    },
  })
  public params!: any
  @Prop({
    type: [ Boolean, String ],
    default () {
      return ''
    },
  })
  public loading!: any
  @Prop({
    type: Boolean,
    default () {
      return true
    },
  })
  public isPagination!: boolean
  @Prop({
    type: Boolean,
    default () {
      return true
    },
  })
  public autoSearch!: boolean
  @Prop({
    type: Boolean,
    default () {
      return true
    },
  })
  public autoHeight!: boolean
  @Prop({
    type: String,
    default () {
      return ''
    },
  })
  public fixedElements!: string
  @Prop({
    type: Number,
    default () {
      return 0
    },
  })
  public fixedHeight!: number
  @Prop({
    type: Object,
  })
  public paginationProps!: any
  @Prop({
    type: Boolean,
    default () {
      return true
    },
  })
  public recordParams!: boolean
  @Prop({
    type: Boolean,
    default () {
      return true
    },
  })
  public recordRow!: boolean
  @Prop({
    type: String,
    default () {
      return 'q'
    },
  })
  public queryKey!: string
  @Prop({
    type: String,
    default () {
      return defaultFilterSplit
    },
  })
  public filterSplit!: string
  @Prop({
    type: String,
    default () {
      return 'results'
    },
  })
  public resultKey!: string
  @Prop({
    type: Object,
    default () {
      return {}
    },
  })
  public tableProps!: any
  // 绑定的事件
  @Prop({
    type: Object,
    default () {
      return {}
    },
  })
  public events!: any
  @Prop({
    type: Function,
  })
  public handleResult!: (res: HttpRes) => any[]
  @Prop({
    type: Function,
  })
  public handleTotal!: (res: HttpRes) => number
  @Prop({
    type: Function,
  })
  public beforeList!: () => boolean
  @Prop({
    type: Boolean,
    default () {
      return false
    },
  })
  /**
   * simple 为 true 时
   * 1. 不展示分页
   * 2. 不在浏览器地址栏记录查询参数
   * 3. 不自动计算表格的高度
   */
  @Prop({
    type: Boolean,
    default () {
      return false
    },
  })
  public simple!: boolean
  @Prop({
    type: Boolean,
    default () {
      return false
    },
  })
  public useCache!: boolean
  @Prop({
    type: String,
    default () {
      return 'post'
    },
  })
  public method!: string
  @Prop({
    type: Function,
  })
  public axiosInst!: AxiosInstance
  /**
   * --------------------------------------------
   * 组件内属性
   * --------------------------------------------
   */
  public remoteData = []
  public innerLoading = false
  public localParams: any = {
    currentPage: 1,
    pageSize: 20,
    sortField: '',
    sortOrder: '',
  }
  public total = 0
  public localHeight: any = null
  public isFirstSearch = true // 第一进入页面时根据浏览器地址栏上的分页参数查询，之后改变条件时都会从当前页开始查询
  public filterMap = {}
  public filterParams = {}
  public rememberRow = '' // 要记住的行的值
  public rememberRowKey = '' // 要记住的行的key
  public rememberRowStatus = true // 初次为true，点击行之后变为false
  public key = guid()

  public render (h: typeof Vue.prototype.$createElement) {
    const tableProps = this.mergeTableProps()
    return (
      <div class={ 'base-table-wrap' } ref={ 'baseTableWrap' }>
        <el-table
          class={ 'base-table' }
          ref={ 'table' }
          { ...{ attrs: tableProps } }
          { ...{ on: this.getTableEvent() } }
        >
          {
            this.columns.map(col => (
              <el-table-column
                { ...{ attrs: this.getColProps(col) } }
                scopedSlots={ this.getColScopedSlots(col) }
              >
              </el-table-column>
            ))
          }
        </el-table>
        {
          !this.isSimple && this.isPagination && tableProps.data.length ? <el-pagination
            class={ 'base-pagination' }
            { ...{ attrs: this.getPaginationProps() } }
            { ...{ on: this.getPaginationEvents() } }
          /> : ''
        }
      </div>
    )
  }

  public created () {
    if (this.recordParams && !this.isSimple) {
      // 根据url页码初始化分页参数
      // @ts-ignore
      this.localParams = { ...this.localParams, ...JSON.parse(this.$route.query[this.queryKey] || '{}') }
      this.localParams.currentPage = this.localParams.currentPage || 1
      this.localParams.pageSize = this.localParams.pageSize || 20
      // 给过滤项赋值
      // @ts-ignore
      const filteredPropList = this.columns.filter((col: Column) => col.props && col.props.filters).map((col: Column) => col.filterProp || col.prop)
      filteredPropList.forEach((item: any) => {
        if (this.localParams[item] !== undefined) {
          setProperty(this.columns, item, { props: { filteredValue: this.localParams[item].split(',').map((v: string) => v + (this.filterSplit || defaultFilterSplit) + item) } })
          this.$emit('update:columns', this.columns)
        }
      })
      // 展示选中的行
      this.rememberRow = this.localParams._rememberRow
      this.rememberRowKey = this.localParams._rememberRowKey
    }
    if ((this.autoHeight || this.fixedElements || this.fixedHeight) && !this.isSimple) {
      // 添加监听事件
      window.addEventListener('resize', this.resize)
      setTimeout(() => {
        this.resize()
      }, 400)
    }
  }

  public get isSimple () {
    return !!this.data || this.simple
  }

  @Watch('params', { deep: true })
  public watchParams () {
    this.searchData(!this.isFirstSearch)
    this.isFirstSearch = false
  }

  public getPaginationProps () {
    return {
      pageSizes: [ 10, 20, 30, 50, 100 ],
      background: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      ...(this.paginationProps || {}),
      currentPage: this.localParams.currentPage,
      pageSize: this.localParams.pageSize,
      total: this.total,
    }
  }

  public getPaginationEvents () {
    const me = this
    return {
      'current-change' (currentPage: number) {
        me.localParams.currentPage = currentPage
        me.searchData()
      },
      'size-change' (pageSize: number) {
        me.localParams.pageSize = pageSize
        me.searchData()
      },
    }
  }

  public resize () {
    debounce(this.calcHeight, 100)()
  }

  /**
   * 计算表格的剩余高度，不同的新项目都需要重新考虑
   */
  public calcHeight () {
    const table: any = this.$refs.table
    if (!table) {
      this.localHeight = null
      return
    }
    const headerHeight = getClientHeight('.app-header-box')
    const paginationHeight = !this.isSimple && this.isPagination && ({
      data: [],
      ...this.tableProps,
      ...(this.remoteData.length === 0 ? {} : { data: this.remoteData }),
    }).data.length ? getClientHeight('.base-pagination') : 0
    const wrapperHeight = getSpaceHeight('.app-main-box')
    const innerPaddingHeight = 0
    const pageHeaderHeight = getClientHeight('.app-breadcrumb-box')
    const tableSpaceHeight = getSpaceHeight('.base-table')
    const btnBoxHeight = getClientHeight('.common-table-box .common-btn-box')
    const customHeight = 1 // 使得分页器与底部留适当距离
    // 计算fixed element的高度
    let fixedElementsHeight = 0
    if (this.fixedElements) {
      this.fixedElements.split(' ').forEach((selector: string) => {
        fixedElementsHeight += getClientHeight(selector)
      })
    }
    // 默认会排除的高度 这意味着 当查询条件使用 common-query 时无需传参数即可自动计算
    const defaultFixedElementHeight = getClientHeight('.common-query')
    // console.log('表格高度调试==========================开始==========================')
    // console.log(headerHeight, '头部高度')
    // console.log(wrapperHeight, '外部边距高度')
    // console.log(pageHeaderHeight, '翻页头部高度')
    // console.log(fixedElementsHeight, '额外高度')
    // console.log(innerPaddingHeight, '内部边距高度')
    // console.log(defaultFixedElementHeight, '查询区域高度')
    // console.log(tableSpaceHeight, '表格边距高度')
    // console.log(paginationHeight, '分页器高度')
    // console.log(this.fixedHeight, '固定高度')
    // console.log(customHeight, '自定义调整高度')
    // console.log(btnBoxHeight, '按钮区域高度')
    // console.log(window.innerHeight, '窗口高度')
    const localHeight = Math.max(MIN_WIN_HEIGHT, window.innerHeight) -
      headerHeight -
      paginationHeight -
      wrapperHeight -
      innerPaddingHeight -
      pageHeaderHeight -
      tableSpaceHeight -
      customHeight -
      this.fixedHeight -
      defaultFixedElementHeight -
      fixedElementsHeight -
      btnBoxHeight
    // console.log(this.localHeight, '表格最终高度')
    // console.log('表格高度调试==========================结束==========================')
    const tableContentElement = table.$el.querySelector('.el-table__body-wrapper > table.el-table__body')
    const tableHeaderElement = table.$el.querySelector('.el-table__header-wrapper')
    if (tableContentElement && tableHeaderElement) {
      // console.log(tableHeaderElement.clientHeight, '表格头部高度')
      // console.log(tableContentElement.clientHeight, '表格内容高度')
      // console.log(localHeight, '计算出来的剩余空间高度')
      // 当出现滚动条时，判断是否将表格与分页器之间填充空白
      if (tableContentElement.clientHeight + tableHeaderElement.clientHeight + 1 <= localHeight) {
        this.localHeight = localHeight
      } else {
        this.localHeight = localHeight
      }
    } else {
      this.localHeight = localHeight
    }
  }

  public searchData (isFirst: boolean = false) {
    const me = this
    // 没有url不执行
    if (!me.url) {
      return false
    }
    // 没通过拦截器不执行
    if (!(me.beforeList ? me.beforeList() : true)) {
      return
    }
    me.innerLoading = true
    debounce(function () {
      me.$req(me.url, me.getParams(isFirst), me.useCache, me.method, me.axiosInst).then((res: HttpRes) => {
        me.innerLoading = false
        if (res.code === 200) {
          me.handleSearchResult(res)
        }
        me.$emit('after-search', res)
      })
    }, 200)()
  }

  public handleSearchResult (res: HttpRes) {
    let result: any
    if (this.handleResult) {
      // 需要处理数据拦截，则处理，若处理会返回结果，则使用新的结果作为显示结果
      result = this.handleResult(res)
    }
    if (result === undefined) {
      this.remoteData = res.data[this.resultKey]
    } else {
      this.remoteData = result
    }
    this.total = this.handleTotal ? this.handleTotal(res.data || res) : res.data.total
  }

  public getParams (isFirst: boolean) {

  }

  public getColScopedSlots (col: Column) {
    return {
      ...this.getColScopedContent(col),
      ...(col.headerSlot ? {
        // @ts-ignore
        header: (props: any) => col.headerSlot ? this.$scopedSlots[col.headerSlot](props) : '',
      } : {}),
    }
  }

  public getColScopedContent (col: Column) {
    return col.contentSlot || col.content || (col.props && col.props.type === 'expand') ? {
      default: (props: any) => {
        if (col.contentSlot) {
          if (this.$scopedSlots[col.contentSlot]) {
            // @ts-ignore
            return this.$scopedSlots[col.contentSlot](props)
          } else {
            throw new Error(`您似乎忘记了配置"${col.contentSlot}"插槽`)
          }
        } else if (col.content) {
          // todo
        } else if (col.props && col.props.type === 'expand') {
          // todo
        }
      },
    } : {}
  }

  public getColProps (col: Column) {
    return {
      prop: col.prop,
      label: col.label,
      align: 'center',
      headerAlign: 'center',
      ...col.props,
    }
  }

  public mergeTableProps () {
    return {
      data: [],
      border: true,
      size: 'mini',
      height: this.localHeight,
      ...this.tableProps,
      ...(this.remoteData.length === 0 ? {} : { data: this.remoteData }),
      ...(this.data ? { data: this.data } : {}),
      ...this.mergeTableFunctionProps(),
      key: guid(),
      loading: this.loading === '' ? this.innerLoading : this.loading,
    }
  }

  /**
   * 表格属性或者方法
   */
  public mergeTableFunctionProps () {
    const me = this
    return {
      'row-class-name' (arg: any) {
        let outerRowClassName: any = me.tableProps['row-class-name'] || ''
        if (outerRowClassName) {
          if (typeof outerRowClassName === 'function') {
            outerRowClassName = outerRowClassName(arg)
          }
        }
        let innerRowClassName = ''
        /**
         * 这段代码的作用：
         * 当开启了'保持选中行功能'后，点击行的时候，会将上次保持的行的高亮效果清空
         * 注：保持选中行功能：点击行之后，该行会高亮，刷新页面，该行仍然高亮
         */
        if (me.rememberRowStatus && me.recordParams && me.recordRow && me.rememberRow && me.rememberRow === arg.row[me.rememberRowKey] + '') {
          innerRowClassName = 'remember-row'
        }
        return `${ outerRowClassName } ${ innerRowClassName }`
      },
    }
  }

  /**
   * 表格监听事件
   */
  public getTableEvent () {
    const me: any = this
    const onEvent = me.events || {}
    return {
      ...onEvent,
      'row-click' (row: any, column: any, event: any) {
        // 点击任意行，都会取消掉刚才记录的行的状态
        me.rememberRowStatus = false
        onEvent['row-click'] && onEvent['row-click']({ row, column, event })
      },
      'sort-change' () {
        if (!onEvent['sort-change']) {
          const { prop, order } = arguments[0]
          me.sortField = prop
          me.sortOrder = order
          me.searchData(true)
        } else {
          onEvent['sort-change'](arguments[0])
        }
      },
      'filter-change' () {
        if (!onEvent['filter-change']) {
          const filterKey: string = Object.keys(arguments[0])[0]
          // @ts-ignore
          const filterValueList: string[] = Object.values(arguments[0])[0]
          if (filterValueList.length) {
            me.filterMap[filterKey] = {
              prop: filterValueList[0].split(me.filterSplit)[1],
              value: filterValueList.map(item => item.split(me.filterSplit)[0]),
            }
          } else {
            me.filterMap[filterKey] = {
              prop: '',
              value: [],
            }
          }
          me.filterParams = {}
          Object.keys(me.filterMap).forEach(key => {
            if (me.filterMap[key].prop) {
              me.filterParams[me.filterMap[key].prop] = me.filterMap[key].value.join()
            }
          })
          me.searchData(true)
        } else {
          onEvent['filter-change']()
        }
      },
    }
  }
}
