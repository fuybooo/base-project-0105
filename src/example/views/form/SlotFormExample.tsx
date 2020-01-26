import { Component, Vue } from 'vue-property-decorator'
import { Schema } from '@/components/form/form.model'
import { fb } from '@/components/fns/fns'

@Component({})
export default class SlotFormExample extends Vue {
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
        <div class={'example-introduce'}>使用slot实现一些控件</div>
        <show value={this.form}/>
        <base-form schema={this.schema} v-model={this.form}/>
      </div>
    )
  }
}
