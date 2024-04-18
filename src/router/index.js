import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      chinren: [
        { path: '', compoennt: Home },
        { path: '/category', compoennt: Category }
      ]
    }
  ]
})

// 登录访问拦截
// router.beforeEach((to) => {
//   const userStore = useUserStore()
//   if (!userStore.token && to.path !== '/login') {
//     return '/login'
//   }
// })

export default router
