import request from '@/utils/request'
// 轮播图接口
export const homeBannerAPI = () => request.get('/home/banner')
// 新鲜好物接口
export const homeNewAPI = () => request.get('/home/new')
// 好物推荐接口
export const homeHotAPI = () => request.get('/home/hot')
