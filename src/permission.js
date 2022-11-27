import router from './router'
import store from '@/store/index'

const whiteList = ['/login', '/404']
// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/asyncGetUserInfo')
        // 获取权限 设置权限
        const menus = store.getters.menus
        const newRoutes = await store.dispatch('permission/filterRouter', menus)
        router.addRoutes([...newRoutes, { path: '*', redirect: '/404', hidden: true }])
        // 固定写法
        next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
