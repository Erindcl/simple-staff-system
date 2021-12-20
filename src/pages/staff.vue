<script setup>
import { onMounted, reactive } from 'vue';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
]
const data = reactive({
  searchVal: '',
  pageNo: 1,
  pageSize: 2,
  tableData: [],
  total: 0,
  columns
})

onMounted(() => {
  fetchData()
})

const fetchData = (currPage) => {
  const allList = [
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' },
    { id: 4, name: '赵六' },
  ]
  let resultData = []
  // 搜索
  if (!data.searchVal) {
    resultData = allList.filter((item) => item.name.indexOf(data.searchVal) !== -1)
  }
  data.total = resultData.length
  // 分页
  data.pageNo = currPage || data.pageNo
  resultData = resultData.filter((item, index) => {
    return (((data.pageNo - 1) * data.pageSize) <= index) && ((data.pageNo * data.pageSize) > index)
  })
  data.tableData = resultData
}
const handleAdd = () => {
  console.log('add')
}
const handlePageChange = (page) => {
  data.pageNo = page
  fetchData()
}
</script>

<template>
  <div class="staff-page">
    <div class="filter-box">
      <a-input v-model:value="data.searchVal" style="width: 240px; margin-right: 12px;" placeholder="请输入姓名" />
      <a-button @click="fetchData(1)" type="primary">查询</a-button>
      <a-button @click="handleAdd" style="position: absolute; right: 0px;" type="primary">新增员工</a-button>
    </div>
    <a-table :dataSource="data.tableData" :columns="data.columns" :pagination="false">
      <template #emptyText>
        <span>暂无数据</span>
      </template>
    </a-table>
    <div class="pagination-box">
      <a-pagination @change="handlePageChange" :current="data.pageNo" :pageSize="data.pageSize" :total="data.total" show-less-items />
    </div>
  </div>
</template>

<style scoped>
.staff-page {
  padding: 20px;
  background: #fff;
}
.filter-box {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
}
.pagination-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
