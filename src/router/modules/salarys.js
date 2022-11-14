import Layout from '@/layout'
export default {
  // 和部门相关的路由
  path: '/salarys',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: { title: '薪水管理', icon: 'money' }
    }
  ]
}
