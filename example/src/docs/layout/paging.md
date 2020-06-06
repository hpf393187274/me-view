
# Paging 分页

## 基础用法
::: demo `v-model` 绑定之值 `label` 设置标签 `placeholder` 提示语句
```html
<template>
  <me-paging :total="total"/>
</template>
<script>
export default {
  data() {
    return {
      total: 500
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
  <div>
    <div class="me-row me-center">
      pageNum = {{info.pageNum}}, pageSize = {{info.pageSize}}
      <me-button @click="total = 10000">变更</me-button>
    </div>
    <me-paging :total="total" border @change-page="handlerPaging"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: undefined,
      info: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    handlerPaging (info) {
      Object.assign(this.info, info)
    }
  }
}
</script>
```
:::