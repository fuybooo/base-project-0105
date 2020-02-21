import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import '@/components/dialog/style.scss'

@Component({})
export default class BaseDialog extends Vue {
  @Prop({ default: false, type: Boolean }) public visible!: boolean
  @Prop({ default () { return {} }, type: Object }) public props!: object
  @Prop({ default: true, type: Boolean }) public autoClose!: boolean
  @Prop({ default: true, type: Boolean }) public onlyOk!: boolean
  @Prop({ default: false, type: Boolean }) public onlyCancel!: boolean
  @Prop({ default: true, type: Boolean }) public footer!: boolean
  @Prop({ default: '' }) public title!: string
  @Prop({ default: '确定' }) public okBtnText!: string
  @Prop({ default: '取消' }) public cancelBtnText!: string
  public localVisible = this.visible
  public defaultProps = {
    'close-on-click-modal': false, // 防止误操作，默认的弹出框在点击modal层时不会关闭弹窗
  }

  public get localProps () {
    return {
      ...this.defaultProps,
      ...this.props,
    }
  }

  public render () {
    return (
      <el-dialog
        visible={ this.localVisible }
        class={ 'base-dialog' }
        ref={ 'dialog' }
        title={ this.title }
        { ...{ attrs: this.localProps } }
        { ...{ on: { 'update:visible': (val: boolean) => this.localVisible = val } } }
      >
        { this.$slots.title ? <div slot={ 'title' }>
          { this.$slots.title }
        </div> : '' }
        { this.$slots.default }
        { this.$slots.footer ? <div slot={ 'footer' }>
          { this.$slots.footer }
        </div> : <div slot={ 'footer' }>
          {
            this.onlyOk ? '' : <el-button size={ 'mini' } onClick={ this.cancel }>取消</el-button>
          }
          <el-button size={ 'mini' } type={ 'success' } onClick={ this.ok }>确定</el-button>
        </div> }
      </el-dialog>
    )
  }

  @Watch('visible')
  public visibleChange () {
    this.localVisible = this.visible
  }

  @Watch('localVisible')
  public localVisibleChange () {
    this.$emit('update:visible', this.localVisible)
  }

  public updateVisible (val: boolean) {
    this.localVisible = val
  }

  @Emit()
  public cancel () {
    if (this.autoClose) {
      this.localVisible = false
    }
  }

  @Emit()
  public ok () {
    if (this.autoClose) {
      this.localVisible = false
    }
  }
}
