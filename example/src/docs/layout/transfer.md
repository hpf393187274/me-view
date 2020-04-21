
# Transfer 穿梭框

## 基础用法
::: demo `v-model` 绑定之值 `label` 设置标签 `placeholder` 提示语句
```html
<template>
  <me-transfer :data="data"/>
</template>
<script>
export default {
  data() {
    return {
      data: [
        { id: '1', label: '陕西省' },
        { id: '2', label: '四川省' },
        { id: '3', label: '江苏省' },
        { id: '4', label: '浙江省' },
        { id: '5', label: '山西省' },
        { id: '6', label: '河南省' }
      ]
    }
  }
}
</script>
```
:::

## 全部用法
::: demo `v-model` 绑定之值 `label` 设置标签 `placeholder` 提示语句
```html
<template>
  <me-transfer :data="data" expanded statistics />
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: '1', label: '陕西省', children: [
            { id: '1-1', label: '西安市' }
          ]
        },
        {
          id: '2', label: '四川省', children: [
            { id: '2-1', label: '郑州市' }
          ]
        },
        {
          id: '3', label: '江苏省', children: [
            { id: '3-1', label: '常州市' }
          ]
        }
      ]
    }
  }
}
</script>
```
:::