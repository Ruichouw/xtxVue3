<script setup>
import goodsItem from '@/views/Home/components/goodsItem.vue'
import { getCategoryFilterAPI } from '@/api/subCategory'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSubCategoryAPI } from '@/api/subCategory'
const route = useRoute()
// 获取面包屑导航数据
const filterData = ref({})
const getFilterData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  filterData.value = res.data.result
}
getFilterData()

// 获取基础列表数据渲染
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})

const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  console.log(res)
  goodList.value = res.data.result.items
}

onMounted(() => getGoodList())

const tabChange = () => {
  // 在tab切换时可能有了很多页数，所以将其重置为1
  reqData.value.page = 1
  getGoodList()
}

// 无限滚动加载更多
// 使用ui的v-infinite-scroll（给滚动列表监听是否滚动底部）
// 和infinite-scroll-disabled（是否禁用监听事件）
// 到底就让页数加一，再重新获取新数据，将新数据和老数据进行拼接，这里用到了展开运算符进行拼接
const flag = ref(false)
const loadMore = async () => {
  // console.log('加载更多')
  reqData.value.page++
  // console.log(reqData.value.page)
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value, ...res.data.result.items]
  if (res.data.result.items.length === 0) {
    // 如果没有数据了，就停止加载更多
    flag.value = true
  }
}
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }"
          >{{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div
        class="body"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="flag"
      >
        <!-- 商品列表-->
        <goods-item v-for="item in goodList" :key="item.id" :goods="item" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
