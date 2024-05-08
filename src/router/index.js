// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import subCategory from '@/views/subCategory/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: subCategory
        },
        {
          path: 'detail/:id',
          component: () => import('@/views/Detail/index.vue')
        },
        {
          path: 'cart',
          component: () => import('@/views/cartList/index.vue')
        },
        {
          path: 'checkout',
          component: () => import('@/views/checkout/index.vue')
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ],
  // 定制路由行为
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
