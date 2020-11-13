# List 列表

## 基础用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <div>
    <me-row>
      <me-button @click="handlerClear">清空选中数据</me-button>
      <me-button @click="getCheckedRecords">获取选中数据</me-button>
      <me-button @click="multiple = !multiple">{{ multiple ? '设为单选' : '设为多选' }}</me-button>
      <me-button @click="handlerSetting">设置数据选中</me-button>
      <me-input v-model="value"/>
    </me-row>
    <me-list ref="list" v-model="value" :data="data" field-value="id" checkbox highlight :multiple="multiple"></me-list>
    <div>
      [
        <div v-for="record in records" :key="record.id">{{ record }}</div>
      ]
    </div>
    dataModel={{dataModel}}
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        multiple: false,
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
| 名称        | 描述                        |  类型   | 默认值 | 可选值      |
| ----------- | --------------------------- | :-----: | :----: | ----------- |
| data        | 数据                        |  Array  |   -    | -           |
| value       | v-model 当前数据            | String  |   -    | -           |
| multiple    | 多选                        | Boolean | false  | true, false |
| checkbox    | 复选框                      | Boolean |  true  | true, false |
| highlight   | 高亮 - multiple = true 失效 | Boolean |  true  | true, false |
| field-value | 值字段                      | String  | false  | -           |
| field-label | 显示字段                    | String  | false  | -           |

## List Events
| 名称  | 描述     |                   参数                   |
| ----- | -------- | :--------------------------------------: |
| click | 点击事件 | { data: Object, index: Number } |
<br />