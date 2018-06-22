/**
 * Created by qqwan on 2018/4/23.
 */
import { getRouters } from '../../api/user'
import { routerItemMap } from '../../router'
import Layout from '@/views/Layout'
import { addChildrenRouters } from '@/common/utils'

const user = {
  state: {
    routers: [],
    menus: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },
  actions: {
    GetRouters ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getRouters().then(response => {
          if (response.retCode === 0 && response.data && response.data.routers) {
            let tempRouters = response.data.routers
            let asynRouters = []
            // 动态生成router
            for (let tempRouter of tempRouters) {
              let curRouterTemplate = {
                path: '/',
                component: Layout,
                children: [
                  {
                    path: '',
                    component: '',
                    name: '',
                    meta: {},
                    icon: '',
                    isBreadcrumb: '',
                    children: []
                  }
                ]
              }
              curRouterTemplate.children[0].path = routerItemMap.path[tempRouter.id]
              curRouterTemplate.children[0].component = routerItemMap.component[tempRouter.id]
              curRouterTemplate.children[0].name = routerItemMap.name[tempRouter.id]
              if (routerItemMap.icon[tempRouter.id] !== undefined) {
                curRouterTemplate.children[0].icon = routerItemMap.icon[tempRouter.id]
              }
              // 添加是否导航标志
              if (tempRouter.isMenu !== undefined && tempRouter.isMenu) {
                curRouterTemplate.children[0].isMenu = tempRouter.isMenu
                curRouterTemplate.children[0].meta.isMenu = tempRouter.isMenu
              }
              // 添加权限
              if (tempRouter.authority !== undefined && tempRouter.authority.length > 0) {
                curRouterTemplate.children[0].meta.authority = tempRouter.authority
              }
              // 添加面包屑标记
              if (tempRouter.isBreadcrumb !== undefined && tempRouter.isBreadcrumb) {
                curRouterTemplate.children[0].meta.isBreadcrumb = tempRouter.isBreadcrumb
              }
              // target:curRouterTemplate.children[0], source:tempRouter
              // 深度添加子级路由
              addChildrenRouters(curRouterTemplate.children[0], tempRouter, routerItemMap)
              asynRouters.push(curRouterTemplate)
            }
            let menus = [] // 定义menus
            for (let menu of asynRouters) {
              menus.push(Object.assign({}, menu.children[0])) // 对象复制赋值给menus，否则会将asynRouters改变
            }
            // 子级都隐藏的menu，处理成无children，以便于生成左导航
            for (let menu of menus) {
              if (menu.children !== undefined && menu.children.length > 0) {
                let hasChild = false
                for (let child of menu.children) {
                  if (child.isMenu) {
                    hasChild = true
                  }
                }
                if (!hasChild) {
                  menu.children = []
                }
              }
            }
            commit('SET_ROUTERS', asynRouters)
            commit('SET_MENUS', menus)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
