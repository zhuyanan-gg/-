import Layout from '@/layout'
export default {
  // 和部门相关的路由
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工管理', icon: 'people' }
    }
  ]
}
