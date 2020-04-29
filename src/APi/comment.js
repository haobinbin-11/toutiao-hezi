// 评论请求相关模块
import request from '@/utils/request'
// 获取评论列表
export const getImages = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/comments',
    params
  })
}
