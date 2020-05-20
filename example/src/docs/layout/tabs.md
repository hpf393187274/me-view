
# Tabs 分页

## 基础用法
::: demo `title` 标题
```html
<template>
  <div class="me-column">
    <me-form ref="from_line" :rules="rules" class="me-row">
      <me-label title="名称" prop="name">
        <me-input v-model="from.name" />
      </me-label>
      <me-label title="标题" prop="title">
        <me-input v-model="from.title" />
      </me-label>
      <me-label title="网址" prop="src">
        <me-input v-model="from.src" />
      </me-label>
      <me-label>
        <div class="me-row">
          <me-button @click="handlerOpenTabPane">打开 OR 激活</me-button>
          <me-button @click="handlerRemoveTabPane">移 出</me-button>
        </div>
      </me-label>
    </me-form>
    <me-tabs ref="tab_line" closable active="163">
      <me-tab-pane name="baidu" type="frame" src="https://www.baidu.com" title="百度" />
      <me-tab-pane name="163" type="frame" src="https://www.163.com" title="163" />
    </me-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      from: {
        name: 'baidu',
        title: '百度',
        src: 'https://www.baidu.com'
      },
      rules: {
        name: [ { required: true, message: '名称不能为空' } ],
        title: [ { required: true, message: '标题不能为空' } ],
        src: [ { required: true, message: '网址不能为空' } ]
      }
    }
  },
  methods: {
    async handlerOpenTabPane () {
      try {
        await this.$refs.from_line.validate()
        this.$refs.tab_line.openTabPane({...this.form})
      } catch (error) {
        console.log(error)
        this.$message.error('表单校验失败!')
      }
    },
    handlerRemoveTabPane () {
      this.$refs.tab_line.removeTabPane({...this.form})
    },
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
