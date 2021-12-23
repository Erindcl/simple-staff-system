<script setup>
import AddModal from '../components/add_staff_modal.vue'
import { onMounted, reactive, ref } from 'vue';

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '工号',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: '岗位',
    dataIndex: 'job',
    key: 'job',
  },
  {
    title: '级别',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
  },
]
const levelMap = new Map([['1', '高级'], ['2', '中级'], ['3', '初级']])
const data = reactive({
  searchVal: '',
  pageNo: 1,
  pageSize: 5,
  tableData: [],
  total: 0,
})
const addModalRef = ref()

onMounted(() => {
  fetchData()
})

const fetchData = (currPage) => {
  const allList = [
    { id: 1, name: '张三', no: '0001', job: '前端开发', level: '3' },
    { id: 2, name: '李四', no: '0002', job: '测试', level: '1' },
    { id: 3, name: '王五', no: '0003', job: '后端开发', level: '2' },
    { id: 4, name: '赵六', no: '0004', job: 'UI', level: '1' },
  ]
  let resultData = []
  // 搜索
  if (data.searchVal) {
    resultData = allList.filter((item) => item.name.indexOf(data.searchVal) !== -1)
  } else {
    resultData = [...allList]
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
  addModalRef.value.init({})
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
    <a-table :dataSource="data.tableData" :columns="columns" :pagination="false">
      <template #emptyText>
        <span>暂无数据</span>
      </template>
      <template #bodyCell="{ text, column, index }">
      <template v-if="column.key === 'index'">
        <span>{{ index + 1 }}</span>
      </template>
      <template v-if="column.key === 'level'">
        <span>{{ levelMap.get(text) }}</span>
      </template>
      <template v-if="column.key === 'operate'">
        <a-button type="link">查看</a-button>
        <a-button type="link">编辑</a-button>
        <a-button type="link">删除</a-button>
      </template>
    </template>
    </a-table>
    <div class="pagination-box">
      <a-pagination @change="handlePageChange" :current="data.pageNo" :pageSize="data.pageSize" :total="data.total" show-less-items />
    </div>
    <AddModal ref="addModalRef" />
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
