// import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginAPI } from '@/api/user'
import { useCartStore } from './cart'
import { mergeCartAPI } from '@/api/cart'

export const useUserStore = defineStore(
  'User',
  () => {
    const cartStore = useCartStore()
    const userInfo = ref({})
    const Login = async (data) => {
      const res = await LoginAPI(data)
      userInfo.value = res.data.result
      console.log(res)
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
      )

      cartStore.getNewCartList()
    }
    const removeUserInfo = () => {
      userInfo.value = {}
      cartStore.clearCart()
    }
    return {
      userInfo,
      Login,
      removeUserInfo
    }
  },
  { persist: true }
)
