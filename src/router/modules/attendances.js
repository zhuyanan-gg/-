import Layout from '@/layout'
export default {
  // 和部门相关的路由
  path: '/attendances',
  component: Layout,
  name: 'attendances',
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: { title: '考勤管理', icon: 'skill' }
    }
  ]
}
