# List 列表

## 基础用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <div>
    <me-row>
      <me-button @click="handlerClear">清空选中数据</me-button>
      <me-button @click="getCheckedRecords">获取选中数据</me-button>
      <me-button @click="handlerSetting">设置数据选中</me-button>
      <me-input v-model="value"/>
    </me-row>
    <me-list ref="list" v-model="value" :data="data" field-value="id" checkbox highlight></me-list>
    <pre>{{records}}</pre>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        records: [],
        data: [
          { id: '1', label: '陕西省sssss'},
          { id: '2', label: '四川省'},
          { id: '3', label: '江苏省'},
          { id: '4', label: '河南省'},
          { id: '5', label: '陕西省'},
          { id: '6', label: '四川省'},
          { id: '7', label: '江苏省'},
          { id: '8', label: '河南省'}
        ]
      }
    },
    methods: {
      handlerClear () {
        this.$refs.list.clearSelection()
      },
      handlerSetting () {
        this.$refs.list.setRecordSelection(this.value.split(/[,;；，]/))
      },
      getCheckedRecords () {
        this.records = this.$refs.list.getRecordSelection()
      }
    }
  }
</script>
```
:::


## List Attributes
| 名称      | 描述   |  类型   | 默认值 | 可选值      |
| --------- | ------ | :-----: | :----: | ----------- |
| title     | 标题   | String  |   -    | -           |
| width     | 宽度   | String  | false  | true, false |
| height    | 高度   | String  | false  | true, false |
| draggable | 可拖拽 | Boolean |  true  | true, false |
| closable  | 可关闭 | Boolean |  true  | true, false |

## List Events
| 名称    | 描述     | 参数  |
| ------- | -------- | :---: |
| confirm | 事件确定 |   -   |
| cancel  | 事件取消 |   -   |

## List Slot
| 名称 | 描述 |
| ---- | ---- |