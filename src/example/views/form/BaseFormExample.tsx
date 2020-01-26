import { Component, Vue } from 'vue-property-decorator'
import { Schema } from '@/components/form/form.model'
import { fb } from '@/components/fns/fns'

@Component({})
export default class BaseFormExample extends Vue {
  public schema: Schema[] = [
    {
      prop: 'name',
      label: '名称',
    },
  ]
  public form = fb(this.schema)
  public render () {
    return (
      <div>
        <div class={'example-introduce'}>这是最简单的表单使用方式</div>
        <show value={this.form}/>
        <base-form schema={this.schema} v-model={this.form}/>
      </div>
    )
  }
}
