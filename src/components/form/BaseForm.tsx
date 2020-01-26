import { Component, Prop, Vue } from 'vue-property-decorator'
import { childrenCompMap, compMap, FormChangeEvent, FormProps, Schema, Option } from '@/components/form/form.model'
import { Pattern } from '@/models/common/models'
import { getCalcLength, getProp, setProp } from '@/util/fns/fns'
import {
  getLabelOfOption,
  getValueOfOption,
  isCheckbox,
  isDate,
  isDateRange,
  isSelect,
  transferRule,
} from '@/components/fns/fns'
import format from 'date-fns/format'
import { VNodeChildren } from 'vue'
import '@/components/form/BaseForm.scss'
let vueH: any = null
@Component({})
export default class BaseForm extends Vue {
  @Prop({
    type: Array,
    required: true,
  })
  public schema!: Schema[]
  @Prop({
    type: Object,
    required: true,
  })
  public value!: any
  /**
   * 是否为行内表单
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  public inline!: boolean
  /**
   * 是否按照栅格排列
   * 注意：
   * 若 inline 为true 则 isRow 默认为false
   * 若 inline 为false 则 isRow 默认为true
   */
  @Prop({
    type: Boolean,
  })
  public isRow!: boolean
  /**
   * 按照栅格排列时的跨度
   */
  @Prop({
    type: [ Number, String ],
    default: 24,
  })
  public span!: any
  @Prop({
    type: Boolean,
    default: true,
  })
  public useDefaultBtnStyle!: boolean
  /**
   * 表单属性
   */
  @Prop({
    type: Object,
    default () {
      return {}
    },
  })
  public formProps!: FormProps
  /**
   * 表单类型
   */
  @Prop({
    type: String,
  })
  public formPattern!: Pattern
  @Prop({
    type: String,
    default: '',
  })
  public useCustomFormClass!: string
  public render (h: typeof Vue.prototype.$createElement) {
    vueH = h
    const formProps = this.mergeFormProps()
    return (
      <el-form
        ref={'form'}
        class={'base-form ' + (this.useCustomFormClass || 'default-form')}
        { ...{ attrs: formProps } }
      >
        {
          this.isRow ? <el-row>{this.getFormItems()}</el-row> : this.getFormItems()
        }
        {
          this.$slots.default ? this.isRow ? <el-row>{this.$slots.default}</el-row> : this.$slots.default : ''
        }
      </el-form>
    )
  }
  public getFormItems () {
    return this.schema.map(item => this.isRow ? <el-col span={+(item.span || this.span)}>{this.getFormItem(item)}</el-col> : this.getFormItem(item))
  }
  public getFormItem (item: Schema) {
    const itemProps = this.mergeItemProps(item)
    return (
      <el-form-item
        class={this.getClassName(item, 'base-form-item')}
        { ...{ attrs: itemProps } }
      >
        {
          this.getFormControl(item)
        }
      </el-form-item>
    )
  }
  public mergeItemProps (item: Schema) {
    const itemProps = item.formItemProps || {}
    return {
      ...itemProps,
      prop: item.prop,
      label: item.label,
      ...(itemProps.rules ? { rules: transferRule(itemProps.rules) } : {}),
    }
  }
  public getClassName (item: Schema, prefix = 'base-form-control') {
    const classType = this.getFormControlClassType(item)
    return ` ${ prefix } ${ item.prop ? (prefix + '-' + item.prop) : '' } ${ prefix }-${ classType.type }${ classType.fixedHeight ? ` ${ prefix }-fixed-height` : '' }`
  }
  public getFormControl (item: Schema) {
    if (item.prop) {
      if (item.comp === 'slot') {
        return this.$slots[item.prop]
      } else {
        let formControl: VNodeChildren
        if (this.formPattern === 'view' || item.pattern === 'view') {
          formControl = vueH(item.viewComponent || 'base-view-html', {
            props: {
              ...item.props,
              formItem: item,
              value: getProp.bind(this.value)(item.prop),
            },
          })
        } else {
          // @ts-ignore
          const tag = compMap[item.comp || 'input'] || item.comp
          formControl = vueH(tag, {
            props: this.getFormControlProps(item),
            attrs: this.getFormControlAttrs(item),
            ...this.getElementDataObject(item),
          }, this.createFormControlVNodeChildren(item))
        }
        return formControl
      }
    }
  }
  public createFormControlVNodeChildren (item: Schema): VNodeChildren {
    let vNodeChildren: VNodeChildren
    // @ts-ignore
    const tag = childrenCompMap[item.comp || 'input']
    // 目前只支持 select radio checkbox 2019-06-25
    if (tag && this.formPattern !== 'view') {
      vNodeChildren = ((item.props || {}).options || []).map((option: Option) => vueH(tag, {
        props: {
          key: getValueOfOption(option, item),
          // 注意： el-checkbox 和el-radio将label属性作为其绑定值
          label: isSelect(item) ? getLabelOfOption(option, item) : getValueOfOption(option, item),
          // value: getValueOfOption(option, item),
          ...(isSelect(item) ? { value: getValueOfOption(option, item) } : {}),
        },
        on: {
          change (val: any) {
            this.onChildrenChange(val, tag, item, option)
          },
        },
      }, isSelect(item) ? null : getLabelOfOption(option, item)))
    } else {
      vNodeChildren = []
    }
    return vNodeChildren
  }
  public onChildrenChange (val: any, tag: string, item: Schema, option: Option) {
    if (isCheckbox(item)) {
      // @ts-ignore
      let options = me.value[item.prop] || item.initValue || []
      const allOptions = item.props.options
      const crtOption = allOptions.find((o: Option) => getValueOfOption(o, item) === getValueOfOption(option, item))
      if (val) {
        if (!options.includes(getValueOfOption(crtOption, item))) {
          options.push(getValueOfOption(crtOption, item))
        }
      } else {
        options = options.filter((o: string | number) => o !== getValueOfOption(crtOption, item))
      }
      const changeEvent: FormChangeEvent = {
        type: 'childChange',
        item,
        value: val,
        option,
      }
      this.$emit('change', changeEvent)
      setProp.bind(this.value)(item.prop, options)
    }
  }
  public getElementDataObject (item: Schema) {
    const me = this
    const properties = item.nodeProperty || {}
    return {
      class: (properties.class || '') + this.getClassName(item),
      ref: properties.ref,
      refInFor: true,
      ...properties,
      on: {
        input (val: any) {
          me.onInput(val, item)
        },
        change (val: any) {
          me.onChange(val, item)
        },
        ...properties.on,
      },
    }
  }
  public onInput (val: any, item: Schema) {
    // todo 判断输入框的类型
    if (!isCheckbox(item)) {
      setProp.bind(this.value)(item.prop, val)
      this.setExtraValue(item, val)
    }
    const changeEvent: FormChangeEvent = {
      type: 'input',
      item,
      value: val,
    }
    this.$emit('change', changeEvent)
  }
  public onChange (val: any, item: Schema) {
    const changeEvent: FormChangeEvent = {
      type: 'change',
      item,
      value: val,
    }
    this.$emit('change', changeEvent)
  }
  public setExtraValue (item: Schema, val: any) {
    if (isDateRange(item)) {
      if (item.startProp && item.endProp) {
        const [sd, ed] = val
        if (sd) {
          this.setDate('startProp', sd, item)
        } else {
          setProp.bind(this.value)(item.startProp, '')
        }
        if (ed) {
          this.setDate('endProp', ed, item)
        } else {
          setProp.bind(this.value)(item.endProp, '')
        }
      }
    } else if (isDate(item)) {
      if (item.aliasProp) {
        let date: string = format(new Date(val), 'yyyy-MM-dd')
        if (item.props.type === 'year') {
          date = format(new Date(val), 'yyyy')
        } else if (item.props.type === 'month') {
          date = format(new Date(val), 'yyyy-MM')
        } else if (item.props.type === 'datetime') {
          date = format(new Date(val), 'yyyy-MM-dd HH:mm:ss')
        } else if (item.props.type === 'dates') {
          date = (val || []).map((d: string) => format(new Date(d), 'yyyy-MM-dd'))
        } else if (item.props.type === 'week') {
          date = val
        }
        setProp.bind(this.value)(item.aliasProp, date)
      }
    }
  }
  public setDate (index: 'startProp' | 'endProp', date: any, item: Schema) {
    const d = new Date(date)
    // 设置默认的日期文本
    let dateString: string = format(d, 'yyyy-MM-dd')
    if (item.props.type === 'datetimerange') {
      dateString = format(d, 'yyyy-MM-dd HH:mm:ss')
    } else if (item.props.type === 'monthrange') {
      dateString = format(d, 'yyyy-MM')
    }
    setProp.bind(this.value)(item[index], dateString)
  }
  public getFormControlAttrs (item: Schema) {
    const attrs: any = (item.nodeProperty || {}).attrs || {}
    if (!item.comp || item.comp === 'input' || item.comp === 'select') {
      attrs.placeholder = item.placeholder || attrs.placeholder || (item.prop === 'keywords' ? '请输入关键字...' : ((item.comp === 'select' ? '请选择' : '请输入') + (item.label || '')))
    }
    return attrs
  }
  public getFormControlProps (item: Schema) {
    return {
      value: item.prop ? getProp.bind(this.value)(item.prop) : '',
      ...this.getDefaultProps(item),
      ...(item.props || {}),
    }
  }
  public getDefaultProps (item: Schema) {
    const defaultProps: any = {}
    if (!item.comp || item.comp === 'input' || item.comp === 'select') {
      defaultProps.clearable = true
      if (item.comp === 'select') {
        defaultProps.filterable = true
      }
    } else if (item.comp === 'date') {
      const props = item.props || {}
      if (props.type.includes('range')) {
        defaultProps['start-placeholder'] = '开始'
        defaultProps['end-placeholder'] = '结束'
      } else {
        defaultProps.placeholder = props.placeholder || item.label
      }
    } else if (item.comp === 'number') {
      defaultProps['controls-position'] = 'right'
    }
    return defaultProps
  }
  public getFormControlClassType (item: Schema) {
    let type = ''
    let fixedHeight = false
    if (!item.comp || item.comp === 'input') {
      type = 'input'
      if (item.props) {
        if (item.props.type === 'textarea') {
          type = 'textarea'
          fixedHeight = true
        }
      }
    } else if (item.comp === 'select') {
      type = 'select'
      if (item.props) {
        if (item.props.multiple) {
          type = 'select-multiple'
          fixedHeight = true
        }
      }
    } else if (item.comp === 'date') {
      type = 'date'
    } else if (item.comp === 'transfer') {
      fixedHeight = true
    } else if (item.comp === 'radio') {
      fixedHeight = true
    } else if (item.comp === 'upload') {
      fixedHeight = true
    }
    return {
      type: type || item.comp,
      fixedHeight,
    }
  }
  public mergeFormProps () {
    return {
      size: 'small',
      model: this.value,
      hideRequiredAsterisk: this.formPattern === 'view',
      inline: this.inline,
      labelWidth: this.getDefaultLabelWidth(),
      labelPosition: 'right',
      ...this.formProps,
    }
  }
  public getDefaultLabelWidth () {
    const max = this.schema.map((item: Schema) => getCalcLength((item.label || ''))).sort((a: number, b: number) => a - b)[this.schema.length - 1]
    if (max <= 2) {
      return '60px'
    } else if (max <= 3) {
      return '70px'
    } else if (max <= 4) {
      return '90px'
    } else if (max <= 5) {
      return '100px'
    } else if (max <= 6) {
      return '110px'
    } else if (max <= 7) {
      return '125px'
    } else if (max <= 8) {
      return '140px'
    } else {
      return '200px'
    }
  }
}
