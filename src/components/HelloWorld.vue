<script>
import { ref, reactive, onMounted, watch } from 'vue'
export default {
  name: 'HelloWorld',
  setup (props) {
    // 基本数据类型
    const stringData = ref('string data')
    const updateStringData = (val) => {
      stringData.value = val || 'init string data'
    }

    // 复杂数据类型
    // 使用 ref 处理响应式
    const objDataRef = ref({
      type: 'obj',
      arr: [1, 2]
    })
    const updateRefObjData = (val) => {
      objDataRef.value.type = val || 'init objDataRef type'
    }
    // 使用 reactive 处理响应式
    const objDataReactive = reactive({
      type: 'obj',
      arr: [1, 2]
    })
    const updateReactiveObjData = (val) => {
      objDataReactive.type = val || 'init objDataReactive type'
      objDataReactive.arr = val || [0]
    }

    onMounted(() => {
      updateStringData()
      updateRefObjData()
      updateReactiveObjData()
    })

    // watch 监听复杂类型数据修改内部属性值
    // watch ref 响应式变量(复杂数据) 无打印数据
    watch(objDataRef, (newValue, oldValue)=>{
      console.log(`objDataRef 改变了`)
      console.log(newValue)
      console.log(oldValue)
    })

    // watch reactive 响应式变量
    watch(objDataReactive, (newValue, oldValue)=>{
      console.log(`objDataReactive 改变了`)
      // oldValue 与 newValue 相同 是修改后的值
      console.log(newValue) // new Proxy({ type: 'init objDataReactive type', arr: [0] })
      console.log(oldValue) // new Proxy({ type: 'init objDataReactive type', arr: [0] })
    })
    // watch reactive 响应式变量中某一属性
    watch(() => objDataReactive.type, (newValue, oldValue)=>{
      console.log(`objDataReactive.type 改变了`)
      console.log(newValue) // 'init objDataReactive type'
      console.log(oldValue) // obj
    })
    // watch reactive 响应式变量中多个属性
    watch([() => objDataReactive.type,() => objDataReactive.arr], (newValue, oldValue)=>{
      console.log(`objDataReactive.type 和 objDataReactive.arr 改变了`)
      console.log(newValue) // ['init objDataReactive type', new Proxy([0])]
      console.log(oldValue) // ['obj', new Proxy([1, 2])]
    })

    return {
      stringData,
      objDataRef,
      objDataReactive,
      updateStringData,
      updateRefObjData,
      updateReactiveObjData,
    }
  }
}
</script>

<template>
  <p>stringData: {{ stringData }}</p>
  <p>objDataRef: {{ objDataRef.type }}</p>
  <p>objDataReactive: {{ objDataReactive.type }}</p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
