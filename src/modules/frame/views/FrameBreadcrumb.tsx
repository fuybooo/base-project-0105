import { Component, Vue, Watch } from 'vue-property-decorator'
import { getMenuByRoutes } from '@/util/fns/fns-menu'
import { Menu } from '@/models/common/models'
import { Route } from 'vue-router'
import { debounce } from '@/util/fns/fns'
import { getAllParentByTreeAndId, getNodeById } from '@/util/fns/fns-tree'
import rn from '@/router/router.name'

/**
 * 面包屑导航
 */
@Component({})
export default class FrameBreadcrumb extends Vue {
  public baseBread = [ { name: 'home', title: '首页' } ]
  public breadList = [ ...this.baseBread ]
  public menus: Menu[] = []

  public render () {
    return (
      <div class={ 'flex-box pt10' }>
        <el-page-header onBack={ this.goBack } content={ '' }/>
        <el-breadcrumb separator="/">
          {
            this.breadList.map((item: any) => (
              <el-breadcrumb-item key={ item.name }>
                <router-link to={ { name: item.name } }>{ item.title }</router-link>
              </el-breadcrumb-item>
            ))
          }
        </el-breadcrumb>
      </div>
    )
  }

  /**
   * 路由变化时，面包屑导航自动变化
   * @param crtRoute
   */
  @Watch('$route', { immediate: true })
  public routeChange (crtRoute: Route) {
    const me = this
    debounce(() => {
      // 自动根据路由关系生成面包屑导航只能展示简单的通用的导航信息，如果导航信息过于复杂，则需要通过自定义实现
      let breadMenus: any = []
      if (crtRoute.meta && crtRoute.meta.parentName) {
        // 当前路由是不会显示在菜单导航栏中的
        // const crtParent = me.menus.find((item: any) => item.index === crtRoute.meta.parentName)
        const crtParent: any = getNodeById(me.menus, crtRoute.meta.parentName)
        if (crtParent) {
          // 大部分的菜单都是后端配置的，但是前端的路由还是控制者部分导航信息的显示
          // @ts-ignore
          breadMenus = [ ...getBreadList(getAllParentByTreeAndId(me.menus, crtParent.id)), {
            name: crtParent.index,
            title: crtParent.title,
          }, { name: crtRoute.name, title: crtRoute.meta.title } ]
        } else {
          breadMenus = [ { name: crtRoute.name, title: crtRoute.meta.title } ]
        }
        // if (!crtRoute.meta.notAutoPageTitle) {
        //   breadMenus.push({ title: getPageTitle(crtRoute.params.pattern as Pattern) })
        // }
      } else {
        const crtMenu: any = getNodeById(me.menus, crtRoute.name)
        if (crtMenu && crtMenu.index !== rn.home.name) {
          // @ts-ignore
          breadMenus = [ ...getBreadList(getAllParentByTreeAndId(me.menus, crtMenu.id)), {
            name: crtMenu.index,
            title: crtMenu.title,
          } ]
        } else {
          breadMenus = []
        }
      }
      me.breadList = [ ...me.baseBread, ...breadMenus ]
    }, 100)()
  }

  public created () {
    this.menus = getMenuByRoutes()
  }

  public goBack () {
    this.$router.back()
  }
}

function getBreadList (list: any[]) {
  return list.map((item: any) => ({ name: item.index, title: item.title }))
}
