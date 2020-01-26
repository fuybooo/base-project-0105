import { Component, Prop, Vue } from 'vue-property-decorator'
import { formatJson } from '@/util/fns/fns-widget'
import '@/components/show-value-box/style.scss'

@Component({})
export default class ShowValueBox extends Vue {
  @Prop({ default () { return {} } })
  public value!: any
  @Prop({ default: '' })
  public title!: string
  public hidden = true

  public render () {
    return (
      <div class={ 'show-value-box' }>
        <div class={ 'show-value-title' }>{ this.title }</div>
        <div class={ 'show-value-toolbar tar' }>
          <el-button type={'text'} onClick={ () => { this.hidden = !this.hidden } }>{ this.hidden ? '展开' : '收起' }</el-button>
        </div>
        <div class={ 'show-value-content' } hidden={this.hidden}>
          { formatJson(JSON.stringify(this.value)) }
        </div>
        <div class={ 'show-value-toolbar tar' } hidden={this.hidden}>
          <el-button type={'text'} onClick={ () => { this.hidden = !this.hidden } }>{ this.hidden ? '展开' : '收起' }</el-button>
        </div>
      </div>
    )
  }
}
