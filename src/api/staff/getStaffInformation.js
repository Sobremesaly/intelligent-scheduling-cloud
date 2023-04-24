import qs from 'qs'
import http from '../../utils/axios'
export const getStaffInformation = params =>
  http
    .post(
      (http.url = 'staff/getStaffInformation'),
      (http.data = qs.stringify(params)),
      (http.defaults.headers.common['Content-Type'] =
        'application/x-www-form-urlencoded')
    )
    .then(response => {
      return response
    })
