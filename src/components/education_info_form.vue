<script setup>
import { reactive } from 'vue'
import { Form } from 'ant-design-vue'

const useForm = Form.useForm
const formValues = reactive({
  educationBackground: undefined,
  university: undefined,
  professional: undefined,
  graduationTime: undefined,
})
const rules = reactive({
  educationBackground: [
    { required: true, message: '必填项' },
  ],
  university: [
    { required: true, message: '必填项' },
  ],
  professional: [
    { required: true, message: '必填项' },
  ],
  graduationTime: [
    { required: true, message: '必填项' },
  ],
})
const { resetFields, validate, validateInfos } = useForm(formValues, rules);

const init = (formData) => {
  resetFields()
  formValues.educationBackground = formData.educationBackground
  formValues.university = formData.university
  formValues.professional = formData.professional
  formValues.graduationTime = formData.graduationTime
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
      <a-form-item label="学历" v-bind="validateInfos.educationBackground">
        <a-input v-model:value="formValues.educationBackground" placeholder="请输入学历" />
      </a-form-item>
      <a-form-item label="院校" v-bind="validateInfos.university">
        <a-input v-model:value="formValues.university" placeholder="请输入院校" />
      </a-form-item>
      <a-form-item label="专业" v-bind="validateInfos.professional">
        <a-input v-model:value="formValues.professional" placeholder="请输入专业" />
      </a-form-item>
      <a-form-item label="毕业时间" v-bind="validateInfos.graduationTime">
        <a-date-picker v-model:value="formValues.graduationTime" style="width: 240px;" placeholder="请选择毕业时间" />
      </a-form-item>
    </a-form>
</template>
<style scoped>

</style>