import Layout from '@/layout'
export default {
  // 和部门相关的路由
  path: '/social',
  component: Layout,
  name: 'social_securitys',
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      meta: { title: '社保管理', icon: 'table' }
    }
  ]
}
