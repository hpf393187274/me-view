# Message 消息

## 基础用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <div class="me-row">
    <me-button type="info" icon="icon-info" @click="info">info</me-button>
    <me-button type="success" icon="icon-success" @click="success">success</me-button>
    <me-button type="warning" icon="icon-warning" @click="warning">warning</me-button>
    <me-button type="error" icon="icon-error" @click="error">error</me-button>
    <me-button icon="icon-loading" @click="loading">loading</me-button>
  </div>
</template>
<script>
export default {
  methods: {
    info() {
      this.$message.info({ content: 'info' })
    },
    success() {
      this.$message.success({ content: 'success' })
    },
    warning() {
      this.$message.warning({ content: 'warning' })
    },
    error() {
      this.$message.error({ content: 'error' })
    },
    loading() {
      this.$message.loading({ content: 'loading' })
    },
  }
}
</script>
```
:::



### Message Attributes
| 名称     | 描述                         |  类型   | 默认值 | 可选值      |
| -------- | ---------------------------- | :-----: | :----: | ----------- |
| closable | 是否可关闭                   | Boolean |  true  | true, false |
| content  | 内容                         | String  |   -    |             |
| icon     | 图标 -不建议修改             | String  |   -    |             |
| duration | 消失间隔，单位秒 -不建议修改 | String  |   2    |             |

### Message Methods Static

| 方法名  | 描述 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| info    | 提示 | -    | -      |
| success | 成功 | -    | -      |
| warning | 警告 | -    | -      |
| error   | 异常 | -    | -      |
| loading | 加载 | -    | -      |