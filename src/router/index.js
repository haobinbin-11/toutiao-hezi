import Vue from 'vue'
import VueRouter from 'vue-router'
// 加载登录组件
// 在 VueCli 创建的项目中 @ 表示 src 目录
// 它是src 目录的路径别名
// 好处就是 它不受当前路径影响
// 注意 @就是 src 路径 后面别忘了写那个斜杠
// 使用建议   如果加载的资源路径就在当前目录下 正常写
//        如果需要进行父级路径查找的 都使用 @
import Login from '@/views/login'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
