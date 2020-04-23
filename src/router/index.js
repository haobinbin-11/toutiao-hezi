import Vue from 'vue'
import VueRouter from 'vue-router'
// 加载登录组件
// 在 VueCli 创建的项目中 @ 表示 src 目录
// 它是src 目录的路径别名
// 好处就是 它不受当前路径影响
// 注意 @就是 src 路径 后面别忘了写那个斜杠
// 使用建议   如果加载的资源路径就在当前目录下 正常写
//        如果需要进行父级路径查找的 都使用 @
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'Layout',
    component: Layout,
    children: [
      {
        path: '', // path 为空,会作为默认子路由
        // 路由的名字是干啥的
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫,说白了所有页面的导航都会经过这里
// 守卫导航三个参数
// to: 就是要去的路由页面信息
// from: 来自哪的路由信息
// next: 放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是/login 校验登录状态 如果没有登录就跳转到login
  // 如果已登录, 则允许通过
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 校验非登录状态的状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录, 允许通过
      next()
    } else {
      // 没有登录, 跳转到登录页面
      next('/login')
    }
  } else {
  // 允许通过
    next()
  }
})

export default router
