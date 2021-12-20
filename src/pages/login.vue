<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import localDb from '../utils/localDb'

const formValues = reactive({
  name: '',
  password: '',
})
const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
}
const formRef = ref();
const router = useRouter()

const handleLogin = () => {
  formRef.value.validate().then(() => {
    if (formValues.name === 'admin' && formValues.password === '123456') {
      message.success('登录成功')
      localDb.set('userId', {
        id: '001',
        name: 'admin',
      })
      router.push('/home')
    } else {
      message.error('用户名或密码有误')
    }
  })
  .catch(error => {
    console.log('error', error);
  });
}
</script>

<template>
  <div class="login-page">
    <a-form
      :model="formValues"
      :rules="rules"
      ref="formRef"
      class="login-form"
    >
      <div class="login-header">
        登 录
      </div>
      <a-form-item name="name">
        <a-input size="large" v-model:value="formValues.name" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item name="password">
        <a-input size="large" v-model:value="formValues.password" type="password" placeholder="请输入密码" />
      </a-form-item>
      <a-button class="submit-btn" size="large" @click="handleLogin" type="primary">登 录</a-button>
    </a-form>
  </div>
</template>

<style scoped>
.login-header {
  margin-bottom: 30px;
  font-size: 38px;
}
.login-form {
  margin: 200px auto 0px;
  width: 500px;
  padding: 34px 44px;
  box-shadow: 0px 2px 12px 0px rgba(192, 195, 204, 0.55);
}
.submit-btn {
  width: 100px;
}
</style>
