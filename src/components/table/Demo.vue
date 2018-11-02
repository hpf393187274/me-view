<template>
  <div class="demo">
    <Table :dataList="list">
      <template slot="button">
        <button>添加</button>
        <button>修改</button>
        <button>删除</button>
      </template>
      <template slot="header">
        <div>标题</div>
        <div>姓名</div>
        <div>性别</div>
        <div>年龄</div>
      </template>
      <template 
        slot="body"
        slot-scope="{ data }">
        <div>{{ data.text }}</div>
        <div>{{ data.name }}</div>
        <div>{{ data.sex }}</div>
        <div>{{ data.age }}</div>
      </template>
    </Table>
  </div>
</template>
<script>
import Table from './Table'

export default {
  components: { Table },
  props: {},
  data() {
    const obj = {
      text: '一级 1',
      name: '张三1',
      sex: '男',
      age: 28
    }
    const strObj = JSON.stringify(obj)
    let list = new Array()
    for (let i = 0; i < 10; i++) {
      list.push(JSON.parse(strObj))
    }
    return {
      list: list
    }
  },
  methods: {
    
  }
}
</script>
<style scoped>
.demo {
  width: 1200px;
  text-align: center;
  padding-left: 100px;
  padding-top: 100px;
}
</style>
