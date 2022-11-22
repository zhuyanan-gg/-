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
// 查看员工详细信息
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
// 保存员工基本信息
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

// 保存个人信息
export const saveUserDetail = (data) => {
  return request({
    method: 'PUT',
    url: `/sys/user/${data.id}`,
    data
  })
}

export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
