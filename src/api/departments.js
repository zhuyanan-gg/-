import request from '@/utils/request'

export const getDepartments = () => {
  return request({
    url: '/company/department'
  })
}
