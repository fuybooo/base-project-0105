import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Test1Example extends Vue {
  public render () {
    return (
      <div>
        <el-button type={'primary'}>简单测试某些功能</el-button>
      </div>
    )
  }
}
