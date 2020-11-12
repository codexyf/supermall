import axios from 'axios'

// 导出函数，网络请求
export function request(config) {
  // 定义axios对象，设置公共属性，baseURL：公共请求路径；timeout：请求超时时间（毫秒）
  const instace = axios.create({
    baseURL: '赵老师',
    timeout: 10000
  })

  // 请求拦截器，参数为两个函数，第一个为成功时的回调函数，必须return回数据，否则无法发出请求，第二个为请求失败时的回调函数
  instace.interceptors.request.use(config => {
    return config
  }, err => {
  })

  // 接受数据拦截器，参数为两个函数，第一个为成功时接回调函数，return回处理过的数据，必须，第二个为请求失败时的回调函数
  instace.interceptors.response.use(res => {
    console.log(res);
    return res.data
  }, err => {
  })

  // 返回类型为Promise对象
  return instace(config)
}