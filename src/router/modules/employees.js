import Layout from '@/layout'
export default {
  // 和部门相关的路由
  path: '/employees',
  component: Layout,
  name: 'employees',
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工管理', icon: 'people' }
    },
    {
      path: 'detail/:userId',
      component: () => import('@/views/employees/components/detail'),
      hidden: true, // 不在左侧菜单显示
      props: true
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/components/print'),
      hidden: true
    }
  ]
}
