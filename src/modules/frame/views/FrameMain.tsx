import { Component, Vue } from 'vue-property-decorator'

/**
 * 中心内容
 */
@Component({})
export default class FrameMain extends Vue {
  public render () {
    return (
      <router-view class={this.$route.meta.noPadding ? 'no-padding' : 'common-main-padding'}/>
    )
  }
}
