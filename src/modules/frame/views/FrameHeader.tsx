import { Component, Vue } from 'vue-property-decorator'

/**
 * 头部
 */
@Component({})
export default class FrameHeader extends Vue {
  public render () {
    return (
      <div>
        <div class={'header-logo-box'}>
          头像，标题等
        </div>
        <div class={'header-toolbar-box'}>
          消息，头像，个人中心，退出等
        </div>
      </div>
    )
  }
}
