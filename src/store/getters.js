const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  username: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  companyId: state => state.user.userInfo.companyId,
  // menus权限
  menus: state => state.user.userInfo.roles.menus,
  routes: state => state.permission.routes,
  points: state => state.user.userInfo.roles.points
}
export default getters

