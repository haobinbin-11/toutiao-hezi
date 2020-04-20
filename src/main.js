// 项目的启动入口
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载全局样式
import './styles/insex.less'
Vue.config.productionTip = false
// 创建Vue根实例
// 把router 配置到根实例
// 通过 render 方法把 APP 根组件渲染到 #APP 入口节点
new Vue({
  router,
  render: h => h(App)
  // el:'#app' 等价于 $mount('#app)
}).$mount('#app')
