
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

## Tabs Attributes
| 名称     | 描述                    |  类型   | 默认值 | 可选值      |
| -------- | ----------------------- | :-----: | :----: | ----------- |
| active   | 激活页签，tab-pane name | String  |   -    | -           |
| closable | 是否可关闭              | Boolean | false  | true, false |
| mode     | 模式                    | String  |  line  | line, card  |
| type     | 类型                    | String  |  pane  | pane, frame |

## Tabs Events
| 名称         | 描述         |   参数   |
| ------------ | ------------ | :------: |
| click        | 页签点击事件 | 当前页签 |
| click-before | 页签点击之前 | 当前页签 |

## Tabs Slot
| 名称    | 描述              |
| ------- | ----------------- |
| default | 只能放入 tab-pane |


## TabPane Attributes
| 名称     | 描述                   |  类型   |    默认值    | 可选值      |
| -------- | ---------------------- | :-----: | :----------: | ----------- |
| title    | tan-pane 标题          | String  |      -       | -           |
| name     | 唯一名称               | String  | 系统自动生成 | -           |
| closable | 是否可关闭             | Boolean |    false     | true, false |
| type     | 类型                   | String  |     pane     | pane, frame |
| src      | type = frame 的请求Url | String  |      -       | -           |
