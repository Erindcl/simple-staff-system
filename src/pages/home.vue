<script setup>
import { onMounted, reactive } from 'vue'
import localDb from '../utils/localDb'

const data = reactive({
  userInfo: {},
  homeData: {},
})

const getUserInfo = () => {
  data.userInfo = localDb.get('userInfo')
  data.homeData = {
    count: 22,
    newCount: 7,
  }
}

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div class="home-page">
    <div>Hi！ {{ data.userInfo.name }}</div>
    <div>
      员工总数：{{ data.homeData.count }}
      今日新增员工数：{{ data.homeData.newCount }}
    </div>
  </div>
</template>

<style scoped>
</style>
