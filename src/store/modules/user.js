import { getToken, setToken, removeToken, setTime } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {}
}
// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    token ? setToken(token) : removeToken()
  },
  // 设置头像和姓名
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo }
  }
}
// 执行异步
const actions = {
  async userLogin({ commit }, data) {
    try {
      const token = await login(data)
      commit('setToken', token)
      setTime()
      return true
    } catch (error) {
      console.log(error)
      commit('setToken', null)
      return false
    }
  },
  async asyncGetUserInfo({ commit }) {
    const data = await getUserInfo()
    const baseInfo = await getUserDetailById(data.userId)
    commit('setUserInfo', { ...data, ...baseInfo })
  },
  logout({ commit }) {
    commit('setToken', null)
    commit('setUserInfo', {})
    // 还需要重置路由  重置permission的routes
    resetRouter()
    commit('permission/setRoutes', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
