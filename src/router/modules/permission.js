import Layout from '@/layout'
export default {
  // 和部门相关的路由
  path: '/permission',
  component: Layout,
  name: 'permissions',
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
