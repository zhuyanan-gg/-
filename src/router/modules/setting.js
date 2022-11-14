import Layout from '@/layout'
export default {
  // 和部门相关的路由
  path: '/setting',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/setting'),
      meta: { title: '公司设置', icon: 'setting' }
    }
  ]
}
