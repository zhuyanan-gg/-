import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'), // 路由懒加载
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // excel导入
  {
    path: '/import',
    component: Layout,
    hidden: true, // 隐藏在左侧菜单中
    children: [{
      path: '', // 二级路由path什么都不写 表示二级默认路由
      component: () => import('@/views/import')
    }]
  }
]
export const asyncRoutes = [
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  approvalsRouter,
  attendancesRouter,
  salarysRouter,
  socialRouter,
  settingRouter
]

const createRouter = () => new Router({
  // 打开一个路由界面默认会在最顶部
  scrollBehavior: () => ({ y: 0 }),
  // routes: [...constantRoutes, ...asyncRoutes,
  //   // 404必须在路由的最底部
  //   { path: '*', redirect: '/404', hidden: true }]
  routes: [...constantRoutes]
})

const router = createRouter()

// 重置路由的方法
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
