import request from '@/utils/request'
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
export function editRole(data) {
  return request({
    url: `sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}
