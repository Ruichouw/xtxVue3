// 封装购物车模块

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 1. 定义state - cartList
    const cartList = ref([])
    // 2. 定义action - addCart
    const addCart = (goods) => {
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
    // 删除功能：两种方法（1）splice(下标，数量)
    // （2）filter
    const delCart = (skuId) => {
      // const index = cartList.value.findIndex((item) => item.skuId === skuId)
      // cartList.value.splice(index, 1)
      cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    }
    return {
      cartList,
      addCart,
      delCart
    }
  },
  {
    persist: true
  }
)
