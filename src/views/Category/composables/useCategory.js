import { getTopCategoryAPI } from '@/api/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()
  const getCategoryList = async (id) => {
    console.log(111)
    const res = await getTopCategoryAPI(id)
    categoryData.value = res.data.result
    console.log(categoryData.value)
    console.log(3333)
  }
  onMounted(() => getCategoryList(route.params.id))
  return {
    categoryData
  }
}
