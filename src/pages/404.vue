<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.replace('/home')
}
</script>

<template>
  <a-result status="404" title="404" sub-title="您访问的页面不存在！">
    <template #extra>
      <a-button @click="goHome" type="primary">回到首页</a-button>
    </template>
  </a-result>
</template>

<style scoped>
</style>
