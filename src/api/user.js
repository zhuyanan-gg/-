import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'POST',
    data
  })
}

export const getUserInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export const getUserDetailById = (userId) => {
  return request({
    url: `/sys/user/${userId}`
  })
}
