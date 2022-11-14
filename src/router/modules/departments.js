import Layout from '@/layout'
export default {
  // 和部门相关的路由
  path: '/departments',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
