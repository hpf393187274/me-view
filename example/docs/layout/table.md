# Table 表格




## 基础用法
::: demo `data` 数据 `border` 边框
```html

<template>
  <me-table style="height:300px;width:600px" checkbox multiple :data="data" border highlight>
    <template #header>
      <me-button plain type="primary" icon="icon-plus-square">新增</me-button>
      <me-button plain type="primary" @click="handlerData">变更数据</me-button>
      <me-button plain type="primary" icon="icon-minus-square">批量删除</me-button>
    </template>
    <me-table-cell field="id" label="编号" width="500px" ></me-table-cell>
    <me-table-cell label="操作" v-slot="{data}">
        <me-input v-model="data.id"></me-input>
        <me-input v-model="data.id"></me-input>
        <me-input v-model="data.id"></me-input>
        <me-button>435354353453</me-button>
        <me-button>11111111111</me-button>
        <me-button>22222222222</me-button>
    </me-table-cell>
  </me-table>
</template>
<script>
export default {
  data() {
    return {
      data: [
        { id: '1', label: '陕西省'},
        { id: '2', label: '四川省'},
        { id: '3', label: '江苏省'},
        { id: '4', label: '河南省'}
      ],
      data1: [
        { id: '1', label: '陕西省'},
        { id: '2', label: '四川省'},
        { id: '3', label: '江苏省'},
        { id: '4', label: '河南省'},
        { id: '5', label: '陕西省'},
        { id: '6', label: '四川省'},
        { id: '7', label: '江苏省'},
        { id: '8', label: '河南省'},
        { id: '9', label: '陕西省'},
        { id: '10', label: '四川省'},
        { id: '11', label: '江苏省'},
        { id: '12', label: '河南省'}
      ]
    }
  },
  methods: {
    handlerData () {
      // this.$tools.clearEmpty(this.data)
      this.data.push(...this.data1)
    }
  }
}
</script>
```
:::
