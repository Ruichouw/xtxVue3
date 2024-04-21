import { defineStore } from 'pinia'
import { ref } from 'vue'
import { layoutGetCategoryAPI } from '@/api/layout'
export const useCategoryStore = defineStore('category', () => {
  const CategoryList = ref([])
  const getCategory = async () => {
    const res = await layoutGetCategoryAPI()
    // console.log(res)
    CategoryList.value = res.data.result
  }
  return { CategoryList, getCategory }
})
