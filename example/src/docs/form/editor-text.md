# editor-text 文本编辑器


### 基础用法

::: demo `type` 按钮类型
```html
<template>
  <me-editor-text v-model="content"/>
</template>
<script>
export default {
  data() {
    return { 
      content: ''
    }
  }
}
</script>
```
:::