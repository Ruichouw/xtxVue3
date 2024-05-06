import request from '@/utils/request'
export const LoginAPI = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}
