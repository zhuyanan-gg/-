import request from '@/utils/request'

export const getDepartments = () => {
  return request({
    url: '/company/department'
  })
}
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

export function editDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
