import { Option, Schema } from '@/components/form/form.model'
import { Column } from '@/components/table/table.model'
import { setProp } from '@/util/fns/fns'
import { UUID_KEY } from '@/models/common/models'
import { regExp } from '@/models/common/regexps'

export function findItem (list: Schema[] | Column[], prop: string) {
  // @ts-ignore
  return list.find(item => item.prop === prop || item.filterProp === prop)
}

/**
 * @Description: 设置表格项或者表单项属性
 * @param list 要设置的集合
 * @param prop 要设置的那一列的prop值或者filterProp值（满足根据filterProp查找column的需求）
 * @param value 要设置的属性
 * @date 2019-07-06
 */
export function setProperty (list: Schema[] | Column[], prop: string, value: Schema | Column | 'dn' | 'dni' | '' | string) {
  let listItem: any
  if (prop) {
    // @ts-ignore
    listItem = findItem(list, prop)
    if (listItem) {
      // 快捷设置样式 其中 dn dni '' 用来控制显示隐藏
      if (typeof value === 'string') {
        listItem.formItemNodeProperty = {
          class: value,
        }
      } else {
        // 对于对象（非数组）是合并，对于其他则是覆盖，这里的合并只合并到props下的一级，再往下还是覆盖
        Object.keys(value).forEach(key => {
          // @ts-ignore
          const item = value[key]
          if (typeof item === 'object' && !Array.isArray(item)) {
            // 该值为一个对象且非数组，则应该扩展该值到listItem中
            listItem[key] = { ...(listItem[key] || {}), ...item }
          } else {
            listItem[key] = item
          }
        })
      }
    }
  }
  return [ ...list ]
}

export function transferRules (rules: any) {
  const newRules: any = {}
  const keys = Object.keys(rules)
  keys.forEach(item => newRules[item] = transferRule(rules[item]))
  return newRules
}

export function transferRule (itemRule: any[]) {
  return itemRule.map((rule: any) => {
    let message: string = ''
    if ('required' in rule) {
      message = rule.message || '必填项'
    } else if ('max' in rule || 'min' in rule) {
      if ('max' in rule && 'min' in rule) {
        message = rule.message || `输入最少${rule.min}最多${rule.max}个字符之间`
      } else if ('max' in rule) {
        message = rule.message || `输入最多${rule.max}个字符`
      } else {
        message = rule.message || `输入最少${rule.min}个字符`
      }
    } else {
      message = rule.message || '输入不符合要求'
    }
    return {
      ...rule,
      message,
      trigger: rule.trigger || ['change', 'blur'],
    }
  })
}

export function formBuilder (schema: Schema[], extra: any = {}): any {
  const form: any = { [UUID_KEY]: '', ...extra }
  schema.forEach(item => {
    if (item.prop) {
      if (item.startProp && item.endProp) {
        setProp.bind(form)(item.startProp, item.startInitValue === undefined ? '' : item.startInitValue)
        setProp.bind(form)(item.endProp, item.endInitValue === undefined ? '' : item.endInitValue)
      }
      setProp.bind(form)(item.prop, getInitValue(item))
      if (isDateButNotRange(item) && item.aliasProp) {
        setProp.bind(form)(item.aliasProp, '')
      }
    }
  })
  return form

  function getInitValue (item: Schema) {
    if (item.initValue === undefined) {
      // 该控件没有设置默认值，则根据其组件设置相应的初始值
      // 数字类型的组件
      switch (item.comp) {
        case 'slider':
        case 'rate':
          return 0
        case 'transfer':
          return []
        default:
          return ''
      }
    } else {
      return item.initValue
    }
  }
}

export {
  formBuilder as fb, // 重命名一个简写的名称
}

export function getValueOfOption (option: Option, item: Schema) {
  let res
  if (item.valueKeyOfOption) {
    // @ts-ignore
    res = option[item.valueKeyOfOption]
  } else if ('code' in option) {
    res = option.code
  } else if ('id' in option) {
    res = option.id
  } else {
    throw Error('请正确定义option中的key或者value')
  }
  return res
}

export function getLabelOfOption (option: Option, item: Schema) {
  let res
  if (item.labelKeyOfOption) {
    // @ts-ignore
    res = option[item.labelKeyOfOption]
  } else if ('name' in option) {
    res = option.name
  } else if ('label' in option) {
    res = option.label
  } else {
    throw Error('请正确定义option中的key或者value')
  }
  return res
}

export function isCheckbox (item: Schema) {
  return item.comp === 'checkbox'
}

export function isSelect (item: Schema) {
  return item.comp === 'select'
}

export function isRadio (item: Schema) {
  return item.comp === 'radio'
}

export function isDate (item: Schema) {
  return item.comp === 'date'
}

export function isDateButNotRange (item: Schema) {
  return item.comp === 'date' && item.props && item.props.type && !item.props.type.includes('range')
}

export function isDateRange (item: Schema) {
  return item.comp === 'date' && item.props && item.props.type && item.props.type.includes('range')
}

// 基础设值 如果后端返回的结果与前端表单的字段名一一对应则直接调用该方法即可
export function setFormData (form: any, formData: any = {}, clear: boolean = false) {
  if (clear) {
    for (const p in form) {
      if (form.hasOwnProperty(p)) {
        form[p] = ''
      }
    }
  } else {
    for (const p in formData) {
      if (formData.hasOwnProperty(p)) {
        if (formData[p] !== undefined) {
          form[p] = formData[p]
        }
      }
    }
  }
}

export function phoneRule (message = '输入不规范', trigger = 'change', pattern = regExp.mobile) {
  return {
    pattern,
    message,
    trigger,
  }
}

// 必填校验简写形式
export function requiredRule (message = '必填项', trigger = 'change', required = true) {
  return {
    required,
    message,
    trigger,
  }
}

// 只有必填校验时的简写形式
export const requiredRuleProp = {
  formItemProps: {
    rules: [
      requiredRule(),
    ],
  },
}
// 电话加必填校验时的简写形式
export const requiredAndPhoneRuleProp = {
  formItemProps: {
    rules: [
      requiredRule(),
      phoneRule(),
    ],
  },
}

export function radioInputRequireRule () {
  return {
    // tslint:disable-next-line:ban-types
    validator (rule: any, value: any, callback: Function) {
      if (value.radio) {
        if (!value.text) {
          return callback(new Error('必填项'))
        }
      }
      return callback()
    },
    trigger: 'blur',
  }
}

export const radioInputRequireRuleProp = {
  formItemProps: {
    rules: [
      requiredRule(),
      radioInputRequireRule(),
    ],
  },
}

/**
 * 重置表单及表单验证
 * @param formName
 * @param formSchemaName
 * @param formRefName
 */
export function resetForm (formName = 'form', formSchemaName = 'schema', formRefName = 'form') {
  // @ts-ignore
  const me = this
  me[formName] = formBuilder(me[formSchemaName])
  me.$nextTick(() => {
    (me.$refs[formRefName] as any).$refs.form.clearValidate()
  })
}
