// import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginAPI } from '@/api/user'

export const useUserStore = defineStore(
  'User',
  () => {
    const userInfo = ref({})
    const Login = async (data) => {
      const res = await LoginAPI(data)
      userInfo.value = res.data.result
      console.log(res)
    }
    const removeUserInfo = () => {
      userInfo.value = {}
    }
    return {
      userInfo,
      Login,
      removeUserInfo
    }
  },
  { persist: true }
)
