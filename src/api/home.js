import request from '@/utils/request'
// 轮播图接口

export const homeBannerAPI = (params = {}) => {
  const { distributionSite = '1' } = params
  return request({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}
// 新鲜好物接口
export const homeNewAPI = () => request.get('/home/new')
// 好物推荐接口
export const homeHotAPI = () => request.get('/home/hot')
// 获取所有商品接口
export const homeGoodsAPI = () => request.get('/home/goods')
