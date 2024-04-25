import request from '@/utils/request'
// 获取一级分类列表
export const getTopCategoryAPI = (id) => {
  return request({
    url: '/category',
    params: {
      id
    }
  })
}
