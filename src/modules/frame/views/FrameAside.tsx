import { Component, Vue, Watch } from 'vue-property-decorator'
import V from 'vue'
import { Menu } from '@/models/common/models'
import { ProRouteConfig } from '@/router/route.model'
import { debounce } from '@/util/fns/fns'
import { getMenuByRoutes } from '@/util/fns/fns-menu'

/**
 * 菜单内容
 * 菜单可能返回多个根节点
 * 这个组件需要写成一个函数式组件
 */
@Component({
  functional: true,
})
class MenuContent extends Vue {
  public render (h: typeof V.prototype.$createElement, { props }: any) {
    const menus: Menu[] = props.menus
    return menus.filter(menu => !menu.hidden).map(menu => menu.children && menu.children.length ? (
      <el-submenu index={ menu.index }>
        <template slot={ 'title' } class={ 'menu-outer' }>
          <i class={ 'menu-icon ' + (menu.icon || '') }/>
          <span class={ 'menu-title-text menu-text' }>{ menu.title }</span>
        </template>
        { h('MenuContent', { props: { parent: menu, menus: menu.children }, class: 'menu-outer' }) }
      </el-submenu>
    ) : <el-menu-item index={ menu.index } class={ 'menu-outer' }>
      <i class={ 'menu-icon ' + (menu.icon || '') }/>
      <span class={ 'menu-text' }>{ menu.title }</span>
    </el-menu-item>)
  }
}

/**
 * 左侧菜单
 */
@Component({
  components: {
    MenuContent,
  },
})
export default class FrameAside extends Vue {
  public activeIndex = ''
  public menus: Menu[] = []

  public render (h: typeof V.prototype.$createElement) {
    return (
      <el-menu default-active={ this.activeIndex } class={ 'aside-menu' } onSelect={ this.handleSelect }>
        { h('MenuContent', { props: { menus: this.menus }, class: 'menu-outer' }) }
      </el-menu>
    )
  }

  public created () {
    this.menus = getMenuByRoutes()
  }

  /**
   * 路由变化时，更新 activeIndex
   * @param crtRoute
   */
  @Watch('$route', { immediate: true })
  public routeChange (crtRoute: ProRouteConfig) {
    const me = this
    debounce(() => {
      me.activeIndex = crtRoute.meta.parentName || crtRoute.name
    }, 100)()
  }

  public handleSelect (name: string) {
    this.$router.push({ name })
  }
}
