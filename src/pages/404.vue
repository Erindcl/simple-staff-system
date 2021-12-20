<script setup>
const msg = '404'
</script>

<template>
  <a-result status="404" title="404" sub-title="您访问的页面不存在！">
    <template #extra>
      <a-button type="primary">回到首页</a-button>
    </template>
  </a-result>
</template>

<style scoped>
</style>
