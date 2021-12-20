<script setup>
import { onMounted, reactive } from 'vue'
import localDb from '../utils/localDb'

const data = reactive({
  userInfo: {},
  homeData: {},
})

onMounted(() => {
  getUserInfo()
})

const getUserInfo = () => {
  data.userInfo = localDb.get('userInfo') || {}
  data.homeData = {
    count: 22,
    newCount: 7,
  }
}
</script>

<template>
  <div class="home-page">
    <div class="top-box">Hi！ {{ data.userInfo.name }}</div>
    <a-row :gutter="20">
      <a-col :span="12">
        <div class="statistic-box">
          <span>员工总数</span>
          <span></span>
          <span>{{ data.homeData.count }}</span>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="statistic-box">
          <span>今日新增员工数</span>
          <span></span>
          <span>{{ data.homeData.newCount }}</span>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.top-box {
  background: #fff;
  padding: 20px;
  font-size: 28px;
  border-radius: 2px;
  margin-bottom: 20px;
}
.statistic-box {
  padding: 20px;
  background: #fff;
}
.statistic-box > span:first-child {
  font-size: 14px;
  display: block;
  margin-bottom: 12px;
}
.statistic-box > span:nth-child(2) {
  height: 1px;
  width: 20px;
  display: block;
  background: cornflowerblue;
}
.statistic-box > span:last-child {
  font-size: 24px;
  display: block;
  width: 100%;
  text-align: center;
  height: 200px;
  line-height: 200px;
}

</style>
