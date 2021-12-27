<script setup>
import { reactive } from 'vue'
import { Form } from 'ant-design-vue'

const useForm = Form.useForm
const formValues = reactive({
  remark: undefined,
})
const rules = reactive({
  remark: [
    { required: false, message: '必填项' },
  ],
})
const { resetFields, validate, validateInfos } = useForm(formValues, rules);

const init = (formData) => {
  resetFields()
  formValues.remark = formData.remark
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
      <a-form-item label="备注" v-bind="validateInfos.remark">
        <a-textarea
          v-model:value="formValues.remark"
          placeholder="请输入备注"
          :auto-size="{ minRows: 5, maxRows: 10 }"
        />
      </a-form-item>
    </a-form>
</template>
<style scoped>

</style>