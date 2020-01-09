import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class BaseTableExample extends Vue {
  public render () {
    return (
      <div>
        <el-button type={'primary'}>测试按钮2</el-button>
      </div>
    )
  }
}
