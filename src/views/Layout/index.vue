<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores'
const categoryStore = useCategoryStore()
categoryStore.getCategory()
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <router-view />
  <LayoutFooter />
  <LayoutFixed />
</template>
