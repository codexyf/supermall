import {request} from './request'

// 封装houmeMultidata请求数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}