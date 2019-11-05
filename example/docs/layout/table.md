# Table 表格




## 基础用法
::: demo `data` 数据 `border` 边框
```html

<template>
  <div style="height:400px;width:600px;">
    <me-table checkbox multiple :data="data" :columns="columns"  highlight>
      <template #header>
        <me-button plain type="primary" icon="icon-plus-square">新增</me-button>
        <me-button plain type="primary" @click="handlerData">变更数据</me-button>
        <me-button plain type="primary" icon="icon-minus-square">批量删除</me-button>
      </template>
      <template #action="{data}">
        <me-input v-model="data.label"></me-input>
      </template>
      <template #test>
        <me-button>test</me-button>
      </template>
    </me-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { label:'编号', field: 'id'},
        { label:'测试', field: 'test' },
        { label:'操作', field: 'action' }
      ],
      data: [
        { id: '1', label: '陕西省sssss'},
        { id: '2222222222222222222222222222222222222222', label: '四川省'},
        { id: '3', label: '江苏省'},
        { id: '2', label: '四川省'},
        { id: '3', label: '江苏省'},
        { id: '4', label: '河南省'},
        { id: '5', label: '陕西省'},
        { id: '6', label: '四川省'},
        { id: '7', label: '江苏省'},
        { id: '8', label: '河南省'},
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
