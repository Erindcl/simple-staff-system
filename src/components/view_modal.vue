<script setup>
import { reactive } from 'vue'


const data = reactive({
  visible: false,
  title: '查看',
  staffInfo: {},
  infoConfig: [
    { label: '姓名', key: 'name', span: 2 },
    { label: '工号', key: 'no', span: 2 },
    { label: '岗位', key: 'job', span: 2 },
    { label: '级别', key: 'level', span: 2 },
    { label: '学历', key: 'educationBackground', span: 2 },
    { label: '院校', key: 'university', span: 2 },
    { label: '专业', key: 'professional', span: 2 },
    { label: '毕业时间', key: 'graduationTime', span: 2 },
    { label: '备注', key: 'remark', span: 3 },
  ]
})
const levelMap = new Map([[1, '高级'], [2, '中级'], [3, '初级']])

const init = (record) => {
  data.visible = true
  data.staffInfo = { ...record, level: levelMap.get(record.level) }
}
const handleOk = () => {
  data.visible = false
}

defineExpose({
  init
})
</script>
<template>
  <a-modal :width="800" v-model:visible="data.visible" :title="data.title" @ok="handleOk">
    <template #footer>
      <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
    </template>
    <a-descriptions bordered>
      <a-descriptions-item v-for="item in data.infoConfig" :key="item.key" :label="item.label" :span="item.span">{{ data.staffInfo[item.key] }}</a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>
<style scoped>
</style>