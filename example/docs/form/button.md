
# Button 按钮

<style lang="less">
.me-btn {
  margin: 5px;
}
</style>

### 基础用法

::: demo `type` 按钮类型
```html
<template>
  <div>
    <me-row>
      <me-button v-for="type in types" :type="type" :key="type">{{type}}</me-button>
    </me-row>
    <me-row>
      <me-button disabled v-for="type in types" :type="type" :key="type">{{type}}</me-button>
    </me-row>
  </div>
</template>
<script>
export default {
  data() {
    return { 
      types: [
        'default', 'primary', 'info', 'success', 'warning', 'error'
      ]
    }
  }
}
</script>
```
:::

### 简单用法

::: demo `type` 按钮类型 `plain` 简单按钮
```html
<template>
  <div>
    <me-row>
      <me-button plain v-for="type in types" :type="type" :key="type">{{type}}</me-button>
    </me-row>
    <me-row>
      <me-button disabled v-for="type in types" :type="type" :key="type">{{type}}</me-button>
    </me-row>
  </div>
</template>
<script>
export default {
  data() {
    return { 
      types: [
        'default', 'primary', 'info', 'success', 'warning', 'error'
      ]
    }
  }
}
</script>
```
:::

### 形状用法

::: demo `type` 按钮类别 `plain` 简介按钮 `shape` 形状
```html
<template>
  <div>
    <me-row>
      <me-button shape="round" v-for="type in types" :type="type" :key="type">{{type}}</me-button>
    </me-row>
    <me-row>
      <me-button disabled shape="round" v-for="type in types" :type="type" :key="type">{{type}}</me-button>
    </me-row>
    <me-row>
      <me-button shape="circle" v-for="type in types" :type="type" :key="type">{{type}}</me-button>
    </me-row>
    <me-row>
      <me-button disabled shape="circle" v-for="type in types" :type="type" :key="type">{{type}}</me-button>
    </me-row>
  </div>
</template>
<script>
export default {
  data() {
    return { 
      types: [
        'default', 'primary', 'info', 'success', 'warning', 'error'
      ]
    }
  }
}
</script>
```
:::


### Button Attributes
| 名称     | 描述             |  类型   | 默认值  | 可选值                                                        |
| -------- | ---------------- | :-----: | :-----: | ------------------------------------------------------------- |
| type     | 按钮类型         | String  | default | default、primary、dashed、text、info、success、warning、error |
| disabled | 是否禁用状态     | Boolean |  false  | true、false                                                   |
| plain    | 普通的           | Boolean |  false  | true、false                                                   |
| icon     | 图标库：按钮图标 | String  |    -    | 图标库                                                        |
| shape    | 形状             | String  | default | default、circle、round                                        |

### Button Events
| 名称  | 描述     | 参数  |
| ----- | -------- | :---: |
| click | 点击事件 |   -   |
