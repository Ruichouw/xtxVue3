// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { insertCartAPI, getCartAPI, delCartAPI } from '@/api/cart'
import { useUserStore } from './user'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    // 1. 定义state - cartList
    const cartList = ref([])
    // 2. 定义action - addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (userStore.userInfo.token) {
        await insertCartAPI({ skuId, count })
        const res = await getCartAPI()
        cartList.value = res.data.result
      } else {
        console.log('添加', goods)
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 找到了
          item.count += goods.count
        } else {
          // 没找到
          cartList.value.push(goods)
        }
      }
    }

    // 删除功能：两种方法（1）splice(下标，数量)
    // （2）filter
    const delCart = async (skuId) => {
      if (userStore.userInfo.token) {
        await delCartAPI([skuId])
        const res = await getCartAPI()
        cartList.value = res.data.result
      } else {
        cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
      }
      // const index = cartList.value.findIndex((item) => item.skuId === skuId)
      // cartList.value.splice(index, 1)
    }
    // 退出清除购物车
    const clearCart = () => {
      cartList.value = []
    }
    // 计算属性
    const allCount = computed(() =>
      cartList.value.reduce((a, b) => a + b.count, 0)
    )
    const allPrice = computed(() =>
      cartList.value.reduce((a, b) => a + b.price * b.count, 0)
    )
    // 单选功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId)
      if (item) {
        item.selected = selected
      }
    }
    // 全选功能
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }

    // 选中的数量
    const checkedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, b) => a + b.count, 0)
    )
    // 选中的价格总额
    const checkedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, b) => a + b.price * b.count, 0)
    )

    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck,
      checkedCount,
      checkedPrice,
      clearCart
    }
  },
  {
    persist: true
  }
)
