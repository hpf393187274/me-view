
# Input 输入框

## 基础用法
::: demo `v-model` 绑定之值 `label` 设置标签 `placeholder` 提示语句
```html
<template>
  <me-input label="用户名" placeholder="请输入姓名" v-model="value"/>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```
:::