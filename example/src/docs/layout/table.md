# Table 表格

## 基础用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <me-table checkbox multiple has-index :data="data" :columns="columns">
    <template #action="{data}">
      <me-input v-model="data.label" />
    </template>
    <template #test>
      <me-icon>icon-delete</me-icon>
      <me-icon>icon-chakan</me-icon>
      <me-icon>icon-bianji</me-icon>
      <me-icon>icon-jiaoseguanli</me-icon>
    </template>
    <template #footer>
      <me-paging :total="50" class="me-flex"/>
    </template>
  </me-table>
</template>
<script>
  export default {
    data() {
      return {
        columns: [
          { label:'编号', field: 'id', sortable: true, layout: 'center'},
          { label:'测试', field: 'test', layout: 'center'},
          { label:'标题', field: 'label', layout: 'center', clipboard: true, clipboardPrompt: true },
          { label:'操作', field: 'action' }
        ],
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
    }
  }
</script>
```
:::

## 多功能用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <me-table :height="height + 'px'" ref="tableList" field-value ="id" checkbox multiple :data="data" :columns="columns" highlight>
    <template #header>
      <me-button plain type="primary" @click="height = height + 50" icon="icon-plus_strong"> 50 </me-button>
      <me-button plain type="primary" @click="height = height - 50" icon="icon-minus_strong"> 50 </me-button>
      <me-button plain type="primary" icon="icon-plus-square">新增</me-button>
      <me-button plain type="primary" @click="getCheckedRows">获取选中的数据</me-button>
      <me-button plain type="primary" @click="setCheckedRows">设置选中</me-button>
      <me-button plain type="primary" @click="handlerData">变更数据</me-button>
      <me-button plain type="primary" @click="removeSelectData">批量删除</me-button>
    </template>
  </me-table>
</template>
<script>
  export default {
    data() {
      return {
        height: 400,
        columns: [
          { label:'编号', field: 'id', sortable: true},
          { label:'测试', field: 'test' },
          { label:'操作', field: 'action' }
        ],
        selectedData: [
          { id: '2', label: '四川省'},
          { id: '3', label: '江苏省'},
          { id: '4', label: '河南省'}
        ],
        data: [
          // { id: '1', label: '陕西省1'},
          // { id: '2', label: '四川省2'},
          // { id: '3', label: '江苏省3'},
          // { id: '4', label: '河南省4'},
          // { id: '5', label: '陕西省5'},
          // { id: '6', label: '四川省6'},
          // { id: '7', label: '江苏省7'},
          // { id: '8', label: '河南省8'}
        ]
      }
    },
    methods: {
      handlerData () {
        this.data.push(...this.selectedData)
      },
      setCheckedRows () {
        this.$refs.tableList.setCheckedRows(this.selectedData)
      },
      getCheckedRows(){
        const result = this.$refs.tableList.getCheckedRows()
        console.debug('table.getCheckedRows -->', result)
      },
      async removeRow (data) {
        await this.$dialog.confirm('确定要删除当前行？')
        this.$refs.tableList.removeRows([ data ])
      },
      removeSelectData(){
         const result = this.$refs.tableList.getCheckedRows()
         if(this.$type.notArray(result) || result.length < 1 ) {
           this.$message.info('请选择要删除的数据！')
           return
         }
         this.$refs.tableList.removeRows(result)
      }
    }
  }
</script>
```
:::

## Table Attributes
| 名称      | 描述   |  类型   | 默认值 | 可选值      |
| --------- | ------ | :-----: | :----: | ----------- |
| title     | 标题   | String  |   -    | -           |
| width     | 宽度   | String  | false  | true, false |
| height    | 高度   | String  | false  | true, false |
| draggable | 可拖拽 | Boolean |  true  | true, false |
| closable  | 可关闭 | Boolean |  true  | true, false |

## Table Events
| 名称    | 描述     | 参数  |
| ------- | -------- | :---: |
| confirm | 事件确定 |   -   |
| cancel  | 事件取消 |   -   |

## Table Slot
| 名称 | 描述 |
| ---- | ---- |