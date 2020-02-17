
# Tabs 分页

## 基础用法
::: demo `title` 标题
```html
<template>
  <me-tabs closable active="163">
    <me-tab-pane name="baidu" type="frame" src="https://www.baidu.com" title="百度" />
    <me-tab-pane name="163" type="frame" src="https://www.163.com" title="163" />
  </me-tabs>
</template>
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

## 基础用法
::: demo `title` 标题
```html
<template>
  <me-tabs closable active="163" mode="card">
    <me-tab-pane name="baidu" type="frame" src="https://www.baidu.com" title="百度" />
    <me-tab-pane name="163" type="frame" src="https://www.163.com" title="163" />
  </me-tabs>
</template>
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