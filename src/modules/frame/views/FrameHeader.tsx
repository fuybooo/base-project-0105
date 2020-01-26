import { Component, Vue } from 'vue-property-decorator'
import rn from '@/router/router.name'

const avatar = require('../assets/img/avatar.png')

/**
 * 头部
 */
@Component({})
export default class FrameHeader extends Vue {
  public render () {
    return (
      <div class={ 'header-wrap' }>
        <div class={ 'header-logo-box' }>
          <div class={ 'header-logo' }/>
          <div class={ 'header-title' }>管理系统</div>
        </div>
        <div class={ 'header-toolbar-box' }>
          <img class={ 'header-avatar' } src={ avatar } alt="头像"/>
          <span class={ 'header-display-name' }>Fuybooo</span>
          <el-link class={ 'header-logout' } type="danger" onClick={ this.logout }><i
            class={ 'el-icon-switch-button' }/></el-link>
        </div>
      </div>
    )
  }

  public logout () {
    this.$router.push(rn.login)
  }
}
