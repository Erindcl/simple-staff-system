<script setup>
import { reactive } from 'vue'
import { Form } from 'ant-design-vue'

const useForm = Form.useForm
const formValues = reactive({
  name: undefined,
  no: undefined,
  job: undefined,
  level: undefined,
})
const rules = reactive({
  name: [
    { required: true, message: '必填项' },
  ],
  no: [
    { required: true, message: '必填项' },
  ],
  job: [
    { required: true, message: '必填项' },
  ],
  level: [
    { required: true, message: '必填项' },
  ],
})
const { resetFields, validate, validateInfos } = useForm(formValues, rules);
const levelOptions = [
  { label: '高级', value: 1 },
  { label: '中级', value: 2 },
  { label: '低级', value: 3 },
]

const init = (formData) => {
  resetFields()
  formValues.name = formData.name
  formValues.no = formData.no
  formValues.job = formData.job
  formValues.level = formData.level
}

defineExpose({
  init,
  validate,
  formValues
})
</script>
<template>
  <a-form
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="姓名" v-bind="validateInfos.name">
        <a-input v-model:value="formValues.name" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item label="工号" v-bind="validateInfos.no">
        <a-input v-model:value="formValues.no" placeholder="请输入工号" />
      </a-form-item>
      <a-form-item label="岗位" v-bind="validateInfos.job">
        <a-input v-model:value="formValues.job" placeholder="请输入岗位" />
      </a-form-item>
      <a-form-item label="级别" v-bind="validateInfos.level">
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