/*封装axios对登录的一些操作*/
import qs from 'qs'
import http from '../utils/axios'

export const getLogin = params =>
  http
    .post(
      (http.url = 'login'),
      (http.data = qs.stringify(params)),
      (http.defaults.headers.common['Content-Type'] =
        'application/x-www-form-urlencoded')
    )
    .then(response => {
      return response
    })
