import request from '@/utils/request'
// 获取员工列表
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 删除员工
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
// 增加员工
export function addEmployee(data) {
  return request({
    url: `/sys/user`,
    method: 'POST',
    data
  })
}
// 批量excel导入员工
export function batchEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
