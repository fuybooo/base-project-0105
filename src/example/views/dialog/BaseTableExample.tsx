import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class BaseDialogExample extends Vue {
  public render () {
    return (
      <div>
        <div class={'example-introduce'}>这是最简单的弹出层使用方式</div>
      </div>
    )
  }
}
