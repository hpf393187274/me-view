# Table 表格

## 基础用法
::: demo `data` 数据 `border` 边框
```html
<template>
  <me-table style="height:300px;" checkbox multiple :data="data" border highlight>
    <template #header>
      <me-button plain type="primary" icon="icon-plus-square">新增</me-button>
      <me-button plain type="primary" icon="icon-minus-square">批量删除</me-button>
    </template>
    <me-table-cell field="id" label="编号" ></me-table-cell>
    <me-table-cell label="操作" v-slot="{data}">
      <me-input v-model="data.label" class="me-flex">
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
      ]
    }
  }
}
</script>
```
:::
