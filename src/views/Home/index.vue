<template>
  <div class="container">
    <homeCategory></homeCategory>
    <homeBanner></homeBanner>
  </div>

  <homehot></homehot>
  <homenew></homenew>
  <homeproduct></homeproduct>
</template>

<script setup>
import homeBanner from './components/homeBanner.vue'
import homeCategory from './components/homeCategory.vue'
import homehot from './components/homeHot.vue'
import homenew from './components/homeNew.vue'
import homeproduct from './components/homeProduct.vue'
</script>

<style lang="scss" scoped></style>
