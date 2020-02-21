import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class BaseDialogExample extends Vue {
  public visible = false
  public props = {
    title: '弹出层标题',
    width: '500px',
  }

  public render () {
    return (
      <div>
        <div class={ 'example-introduce' }>完整的弹出框示例</div>
        <el-button onClick={ () => this.visible = true }>弹出框</el-button>
        <base-dialog visible={ this.visible } { ...{ attrs: { props: this.props } } } { ...{
          on: {
            ok: this.ok,
            'update:visible': (val: boolean) => this.visible = val,
          },
        } }>
          弹出框的内容
        </base-dialog>
      </div>
    )
  }

  public ok () {
    console.log('ok')
  }
}
