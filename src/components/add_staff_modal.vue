<script setup>
import { reactive, ref } from 'vue'
import BaseInfoForm from './base_info_form.vue'
import EducationInfoForm from './education_info_form.vue'
import OtherInfoForm from './other_info_form.vue'
import moment from "moment";

const emit = defineEmits(['success'])
const steps = [
  { title: '基本信息' },
  { title: '教育背景' },
  { title: '其他' },
]
const data = reactive({
  visible: false,
  title: '',
  staffInfo: {},
  current: 0,
})
const baseInfoFormRef = ref()
const educationInfoFormRef = ref()
const otherInfoFormRef = ref()

const init = (record) => {
  data.visible = true
  data.current = 0
  data.title = record.id ? '编辑员工' : '新增员工'
  data.staffInfo = { ...record }
  setTimeout(() => {
    baseInfoFormRef.value.init(data.staffInfo)
  })
}
const handleNext = () => {
  if (data.current === 0) {
    baseInfoFormRef.value.validate().then(() => {
      data.staffInfo = { ...data.staffInfo, ...baseInfoFormRef.value.formValues }
      data.current ++
      setTimeout(() => {
        educationInfoFormRef.value.init(data.staffInfo)
      })
    }).catch(error => {
      console.log('baseInfoForm error', error)
    });
  } else {
    // data.current === 1
    educationInfoFormRef.value.validate().then(() => {
      data.staffInfo = { ...data.staffInfo, ...educationInfoFormRef.value.formValues }
      data.current ++
      setTimeout(() => {
        otherInfoFormRef.value.init(data.staffInfo)
      })
    }).catch(error => {
      console.log('educationInfoForm error', error)
    });
  }
}
const handlePre = () => {
  if (data.current === 2) {
    data.current --
    setTimeout(() => {
      educationInfoFormRef.value.init(data.staffInfo)
    })
  } else {
    // data.current === 1
    data.current --
    setTimeout(() => {
      baseInfoFormRef.value.init(data.staffInfo)
    })
  }
}
const handleOk = () => {
  otherInfoFormRef.value.validate().then(() => {
    data.staffInfo = { ...data.staffInfo, ...otherInfoFormRef.value.formValues, graduationTime: data.staffInfo.graduationTime?.format('YYYY-MM-DD') }
    data.visible = false
    emit('success', data.staffInfo)
  }).catch(error => {
    console.log('educationInfoForm error', error)
  })
}
const handleCancel = () => {
  data.visible = false
}

defineExpose({
  init
})
</script>
<template>
  <a-modal :width="800" :onCancel="handleCancel" :visible="data.visible" :title="data.title" @ok="handleOk">
    <template #footer>
      <div class="footer-box">
        <a-button v-if="data.current === 0" @click="handleCancel">取消</a-button>
        <a-button v-else @click="handlePre">上一步</a-button>
        <a-button v-if="data.current !== 2" type="primary" @click="handleNext">下一步</a-button>
        <a-button v-else type="primary" @click="handleOk">确定</a-button>
      </div>
    </template>
    <a-steps class="steps" :current="data.current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title"></a-step>
    </a-steps>
    <div class="form-box">
      <BaseInfoForm v-if="data.current === 0" ref="baseInfoFormRef" />
      <EducationInfoForm v-if="data.current === 1" ref="educationInfoFormRef" />
      <OtherInfoForm v-if="data.current === 2" ref="otherInfoFormRef" />
    </div>
  </a-modal>
</template>
<style scoped>
.steps {
  width: 80%;
  margin: 0 auto;
}
.footer-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.form-box {
  margin-top: 50px;
}
</style>