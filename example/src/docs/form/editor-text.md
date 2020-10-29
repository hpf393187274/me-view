# editor-text 文本编辑器

### 常规用法
``` js
// main.js 
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'
```

### 按需用法
``` js
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'
import 'me-view/theme/editor'
import { EditorText } from 'me-view'
Vue.use(EditorText)
```

### 基础用法

::: demo `type` 按钮类型
```html
<template>
  <me-editor-text :readonly="readonly" v-model="content"/>
</template>
<script>
export default {
  data() {
    return { 
      content: '',
      readonly: false
    }
  }
}
</script>
```
:::