// 基于axios封装的请求模块
import axios from 'axios'
// 创建一个axios实例,说白了就是复制了一个axios
// 我们通过这个实例去发请求,把需要配置的配置给这个实例来处理
// 之前写法
// axios.defaults.baseURL = 'http://api.example.com'
// 我们可能有这样的需求
// 例如有多个不同路径的请求接口
// http:123.0.1.300/
// http://baidu.com
// axios.create就是复制了一个axios,不同的 axios 可以有不同的配置
// 而且不会冲突
// 复制出来的axios 和 axios 本身功能相同
// const req1 = axios.create()
// req1.defaults.baseURL = 'http:123.0.1.300/'
// const req2 = axios.create()
// req2.defaults.baseURL = 'http://baidu.com'
// req1.get('xxx')
// req2.get('xxx')
// req1({
//   method: '',
//   url: ''
// })

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'// 请求的基础路径
})

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块

// 请求拦截器
// 响应拦截器
