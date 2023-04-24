/*axios的基础配置*/
import axios from 'axios'
const http = axios.create({
  baseURL: 'http://localhost:10010',
  timeout: 5000
})

/*添加响应拦截器*/

http.interceptors.response.use(
  response => {
    if (response.data.code === 401) {
      window.location.href = '/NoLogin'
    } else if (response.data.code === 402 || response.data.code === 403) {
      window.location.href = '/NoAuthorized'
    } else if (response.status === 404) {
      window.location.href = '/NoPage'
    }
    /*newToken就是因为token快过期了被刷新了*/
    if (response.data.newToken !== undefined) {
      localStorage.setItem('token', response.data.newToken)
    }
    if (response.data.token !== undefined && response.statusText === 'OK') {
      localStorage.setItem('token', response.data.token)
    }
    return Promise.resolve(response)
  },
  error => {
    // 请求报错的回调可以和后端协调返回什么状态码，在此根据对应状态码进行对应处理
    if (error.response) {
      // 如401我就让用户返回登录页
      if (error.response.status === 401) {
        this.props.history.push('/')
      } else if (error.response.status === 403) {
        this.props.history.push('/NoAuthorized')
      } else if (error.response.status === 404) {
        this.props.history.push('/NoPage')
      }
      // 比如返回报错你的页面可能会崩溃，你需要在它崩溃之前做一些操作的话，可以在这里
      return Promise.reject(error)
    } else {
      return Promise.reject('请求超时, 请刷新重试')
    }
  }
)
// 添加请求拦截器
http.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  // 在最后必须return config
  return config
})

export default http
