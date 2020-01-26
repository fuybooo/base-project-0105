import { Component, Vue } from 'vue-property-decorator'
import { Schema } from '@/components/form/form.model'
import { fb } from '@/components/fns/fns'
import { allSchema } from '@/example/views/form/model'

@Component({})
export default class AllFormExample extends Vue {
  public schema: Schema[] = allSchema
  public form = fb(this.schema)
  public render () {
    return (
      <div>
        <div class={'example-introduce'}>所有控件表单</div>
        <show value={this.form}/>
        <base-form schema={this.schema} v-model={this.form}/>
      </div>
    )
  }
}
