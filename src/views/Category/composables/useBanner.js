import { ref } from 'vue'
import { homeBannerAPI } from '@/api/home'
// 获取banner
export function useBanner() {
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await homeBannerAPI({ distributionSite: '2' })
    // console.log(res)
    bannerList.value = res.data.result
  }
  getBanner()
  return {
    bannerList
  }
}
