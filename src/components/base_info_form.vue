<script setup>
import { reactive, ref } from 'vue';

const formValues = reactive({
  name: undefined,
  no: undefined,
  job: undefined,
  level: undefined,
})
const rules = {
  name: [
    { required: true, message: '必填项', trigger: 'blur' },
  ],
  no: [
    { required: true, message: '必填项', trigger: 'blur' },
  ],
  job: [
    { required: true, message: '必填项', trigger: 'blur' },
  ],
  level: [
    { required: true, message: '必填项', trigger: 'blur' },
  ],
}
const levelOptions = [
  { label: '高级', value: 1 },
  { label: '中级', value: 2 },
  { label: '低级', value: 3 },
]
const formRef = ref()

const init = (formData) => {
  formRef.value.resetFields()
  formValues.name = formData.name
  formValues.no = formData.no
  formValues.job = formData.job
  formValues.level = formData.level
}

defineExpose({
  init,
  formRef,
  formValues
})
</script>
<template>
  <a-form
      :model="formValues"
      :rules="rules"
      ref="formRef"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item name="name" label="姓名">
        <a-input v-model:value="formValues.name" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item name="no" label="工号">
        <a-input v-model:value="formValues.no" placeholder="请输入工号" />
      </a-form-item>
      <a-form-item name="job" label="岗位">
        <a-input v-model:value="formValues.job" placeholder="请输入岗位" />
      </a-form-item>
      <a-form-item name="level" label="级别">
        <a-select
          v-model:value="formValues.level"
          style="width: 100%"
          placeholder="请选择级别"
        >
          <a-select-option :key="item.value" v-for="item in levelOptions" :value="item.value">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
</template>
<style scoped>

</style>