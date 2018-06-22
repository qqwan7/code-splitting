/**
 * Created by qqwan on 2018/4/19.
 */
// 深度添加子级路由其中target、source都为对象。
export const addChildrenRouters = function (target, source, routerItemMap) {
  if (source.children !== undefined && source.children.length !== 0) {
    let tempChildArray = []
    for (let child of source.children) {
      let tempChild = {
        meta: {}
      }
      tempChild.path = routerItemMap.path[child.id]
      tempChild.component = routerItemMap.component[child.id]
      tempChild.name = routerItemMap.name[child.id]
      if (routerItemMap.icon[child.id] !== undefined) {
        tempChild.icon = routerItemMap.icon[child.id]
      }
      // 添加是否导航标志
      if (child.isMenu !== undefined && child.isMenu) {
        tempChild.isMenu = child.isMenu
        tempChild.meta.isMenu = child.isMenu
      }
      // 添加权限
      if (child.authority !== undefined && child.authority.length > 0) {
        tempChild.meta.authority = child.authority
      }
      // 添加面包屑标记
      if (child.isBreadcrumb !== undefined && child.isBreadcrumb) {
        tempChild.meta.isBreadcrumb = child.isBreadcrumb
      }
      addChildrenRouters(tempChild, child, routerItemMap)
      tempChildArray.push(tempChild)
    }
    if (tempChildArray.length > 0) {
      target.children = tempChildArray
    }
  }
}
