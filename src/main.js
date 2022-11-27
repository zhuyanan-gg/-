import Vue from 'vue'

import 'normalize.css/normalize.css'

// 引入element-ui组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

// 打印页面的包
import Print from 'vue-print-nb'
Vue.use(Print)

import App from './App'
// vuex引入
import store from './store'
// 引入路由
import router from './router'

import '@/icons'
// 路由守卫  判断token及权限的使用
import '@/permission'
// 自定义事件
import * as directives from '@/directives'
Object.keys(directives).forEach(directiveName => {
  Vue.directive(directiveName, directives[directiveName])
})
// 全局引入mixin混入  可以在各个模块中使用data,methods等
import mixin from './mixin'
Vue.mixin(mixin)

// 筛选
import * as filters from '@/filters/index'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import Component from '@/components'
Vue.use(Component)

Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 阻止你显示生产模式的消息
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

