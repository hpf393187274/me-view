# Table 表格

## 基础用法
::: demo `v-model` 绑定之值 `label` 设置标签 `placeholder` 提示语句
```html
<template>
  <me-table :data="data" border>
    <me-table-column field="id" label="编号"></me-table-column>
    <me-table-column field="a" label="a"></me-table-column>
    <me-table-column field="b" label="b"></me-table-column>
    <me-table-column field="c" label="c"></me-table-column>
    <me-table-column field="d" label="d"></me-table-column>
    <me-table-column field="e" label="e"></me-table-column>
    <me-table-column field="f" label="f"></me-table-column>
    <me-table-column field="g" label="g"></me-table-column>
    <me-table-column field="h" label="h"></me-table-column>
  </me-table>
</template>
<script>
export default {
  data() {
    return {
      data: [
        { id: '1', label: '陕西省', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h' },
        { id: '2', label: '四川省', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h' },
        { id: '3', label: '河南省', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h' }
      ]
    }
  }
}
</script>
```
:::
