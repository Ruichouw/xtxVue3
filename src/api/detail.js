import request from '@/utils/request.js'

export const getDetail = (id) => {
  return request({
    url: '/goods',
    params: {
      id
    }
  })
}
