
# Input 输入框

## 基础用法
::: demo `v-model` 设置标签 `placeholder` 提示语句
```html

<me-input placeholder="请输入姓名" v-model="value1"></me-input>

<script>
export default {
  data() {
    return {
      value1: ''
    }
  }
}
</script>
```
:::


## label
::: demo  `label` 设置标签 
```html

<me-input label="用户名" placeholder="请输入姓名"></me-input>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>
```
:::

## clearable
::: demo `clearable` 可清除的
```html

<me-input label="用户名" clearable placeholder="请输入姓名"></me-input>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>
```
:::