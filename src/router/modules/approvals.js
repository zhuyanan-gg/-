import Layout from '@/layout'
export default {
  // 和部门相关的路由
  path: '/approvals',
  component: Layout,
  name: 'approvals',
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: { title: '审批管理', icon: 'tree-table' }
    }
  ]
}
