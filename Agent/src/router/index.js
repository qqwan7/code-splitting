import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login'
// 处理IE9不支持history
import 'html5-history-api'
import { i18n } from '../i18n'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import cookie from 'js-cookie'
import Layout from '@/views/Layout'
// import Home from '@/views/home'
import store from '@/store'

Vue.use(Router)

if (cookie.get('lang')) {
  i18n.locale = cookie.get('lang')
} else {
  let lang = navigator.language || navigator.browserLanguage
  let langArray = ['en', 'zh-CN']
  lang = langArray.indexOf(lang) < 0 ? 'en' : lang
  i18n.locale = lang
  cookie.set('lang', lang)
}

const Home = () => import('@/views/home')
const routerMap = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/par3',
    children: [
      {
        path: '/par3',
        component: Home,
        name: 'par3'
      }
    ]
  }
]

// router 映射
export const routerItemMap = {
  path: {
    par1: '/par1',
    par1_1: '/par1/par1_1',
    par1_2: '/par1/par1_2',
    par2: '/par2',
    par2_1: '/par2/par2_1',
    par3: '/par3',
    par3_1: '/par3/par3_1',
    par3_2: '/par3/par3_2',
    par4: '/par4',
    par5: '/par5',
    par6: '/par6',
    par6_1: '/par6/par6_1',
    par6_2: '/par6/par6_2',
    par6_2_1: '/par6/par6_2/par6_2_1',
    par6_2_1_1: '/par6/par6_2/par6_2_1/par6_2_1_1',
    par6_2_1_2: '/par6/par6_2/par6_2_1/par6_2_1_2',
    par6_2_2: '/par6/par6_2/par6_2_2',
    par6_2_2_1: '/par6/par6_2/par6_2_2/par6_2_2_1',
    par6_2_2_2: '/par6/par6_2/par6_2_2/par6_2_2_2'
  },
  component: {
    par1: Home,
    par1_1: Home,
    par1_2: Home,
    par2: Home,
    par2_1: Home,
    par3: Home,
    par3_1: Home,
    par3_2: Home,
    par4: Home,
    par5: Home,
    par6: Home,
    par6_1: Home,
    par6_2: Home,
    par6_2_1: Home,
    par6_2_1_1: Home,
    par6_2_1_2: Home,
    par6_2_2: Home,
    par6_2_2_1: Home,
    par6_2_2_2: Home
  },
  icon: {
    par1: 'bg-overview',
    par3: 'bg-access',
    par4: 'bg-clients',
    par6: 'bg-system'
  },
  name: {
    par1: 'par1',
    par1_1: 'par1_1',
    par1_2: 'par1_2',
    par2: 'par2',
    par2_1: 'par2_1',
    par3: 'par3',
    par3_1: 'par3_1',
    par3_2: 'par3_2',
    par4: 'par4',
    par5: 'par5',
    par6: 'par6',
    par6_1: 'par6_1',
    par6_2: 'par6_2',
    par6_2_1: 'par6_2_1',
    par6_2_1_1: 'par6_2_1_1',
    par6_2_1_2: 'par6_2_1_2',
    par6_2_2: 'par6_2_2',
    par6_2_2_1: 'par6_2_2_1',
    par6_2_2_2: 'par6_2_2_2'
  }
}
// router 模板
export const routerTemp = {
  path: '/',
  component: Layout,
  children: [
    {
      path: '',
      component: '',
      name: '',
      children: []
    }
  ]
}

// 创建路由实例
// 使用 HTML5 History 模式
export const router = new Router({
  mode: 'history',
  routes: routerMap
})
// 路由加载之前
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (cookie.get('name')) {
    if (to.path === '/login') {
      cookie.remove('name')
      next({path: '/login'})
    } else {
      // 判断当前用户是否已拉取完routers信息
      if (store.getters.routers.length === 0) {
        store.dispatch('GetRouters').then(response => {
          // 动态添加router
          router.addRoutes(store.getters.routers)
          next(to.path)
        })
      } else {
        next()
      }
    }
  } else {
    if (to.path !== '/login') {
      next({path: '/login'})
    } else {
      next()
    }
  }
})
// 路由加载之后
router.afterEach(route => {
  NProgress.done()
})
