import { ProRouteConfig } from '@/router/route.model'
import { Menu } from '@/models/common/models'
import frameRoutes from '@/modules/frame/router'

export function transferRoutesToMenus (routes: ProRouteConfig[], parentRoute?: ProRouteConfig): any {
  return routes.map(menuItem => {
    // @ts-ignore
    menuItem.meta.pagePath = parentRoute ? [
      ...(parentRoute.meta ? parentRoute.meta.pagePath || [] : []),
      parentRoute,
      // 目前只考虑父路由在同级下的情况
      ...(menuItem.meta.parentName ? [ routes.find(item => item.name === menuItem.meta.parentName) ] : []),
      menuItem,
    ] : []
    const parentItem: any = parentRoute ? {
      ...parentRoute,
      id: parentRoute.name,
      // @ts-ignore
      parentId: parentRoute.parent ? parentRoute.parent.id || '' : '',
      index: parentRoute.name, // 这里要求route中的name是必填且唯一的
      hidden: !!parentRoute.meta.hidden,
      // @ts-ignore
      parentName: parentRoute.parent ? parentRoute.parent.name || '' : '',
      title: parentRoute.meta ? (parentRoute.meta.menuName || parentRoute.meta.title) : '',
      icon: parentRoute.meta ? parentRoute.meta.icon : '',
      // @ts-ignore
      parent: parentRoute.parent,
    } : null
    // 将每个菜单节点构建成树节点的形式
    const newItem = {
      ...menuItem,
      id: menuItem.name,
      parentId: parentRoute ? parentRoute.id || '' : '',
      index: menuItem.name, // 这里要求route中的name是必填且唯一的
      hidden: !!menuItem.meta.hidden,
      parentName: parentRoute ? parentRoute.name : menuItem.meta.parentName || '',
      title: menuItem.meta ? (menuItem.meta.menuName || menuItem.meta.title) : '',
      icon: menuItem.meta ? menuItem.meta.icon : '',
      parent: parentItem,
    }
    return {
      ...newItem,
      ...(menuItem.children ? {
        // @ts-ignore
        children: transferRoutesToMenus(menuItem.children, {
          ...newItem,
          children: menuItem.children,
        }),
      } : {}),
    }
  })
}

/**
 * 若路由是由前端控制，则调用此方法获取路由
 */
export function getMenuByRoutes (): Menu[] {
  // @ts-ignore
  return transferRoutesToMenus(frameRoutes[0].children)
}
