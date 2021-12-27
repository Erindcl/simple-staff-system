<script setup>
import { PoweroffOutlined } from '@ant-design/icons-vue'
import localDb from '../utils/localDb'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, reactive, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const data = reactive({
  userInfo: localDb.get('userInfo') || {},
  selectedKeys: [],
})

watch(() => route.path, (newVal) => {
  let tempArr = newVal?.split('/') || []
  let currPath = tempArr[tempArr.length - 1] ? tempArr[tempArr.length - 1] : ''
  data.selectedKeys = currPath ? [currPath] : []
}, { immediate: true })

onMounted(() => {
  if (!data.userInfo.id) {
    router.push('/login')
  }
})

const loginOut = () => {
  localDb.clear()
  router.push('/login')
}
const handleMenuClick = (item) => {
  router.push(`/${item.key}`)
}
</script>

<template>
  <a-layout>
    <a-layout-header class="layout-header">
      <img src="../assets/logo.png" />
      <a-menu
        v-model:selectedKeys="data.selectedKeys"
        theme="dark"
        mode="horizontal"
        class="nav-menu"
        @click="handleMenuClick"
      >
        <a-menu-item key="home">首页</a-menu-item>
        <a-menu-item key="staff">员工管理</a-menu-item>
      </a-menu>
      <div class="header-right">
        <span>{{ data.userInfo.name }}</span>
        <PoweroffOutlined title="退出登录" @click="loginOut" />
      </div>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.layout-header {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0px 20px;
}
.layout-header > img {
  height: 40px;
}
.nav-menu {
  margin-left: 80px;
}
.header-right {
  position: absolute;
  right: 20px;
  color: #fff;
  display: flex;
  align-items: center;
}
.header-right > .anticon {
  cursor: pointer;
  margin-left: 12px;
}
.layout-content {
  padding: 20px;
  min-height: calc(100vh - 64px);
}
</style>
