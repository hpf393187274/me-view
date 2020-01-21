# Table 表格

## 基础用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <me-table has-index height="400px" :data="data" :columns="columns">
    <template #header>
      <me-button plain type="primary" icon="icon-plus-square">新增</me-button>
      <me-button plain type="primary" @click="handlerData">变更数据</me-button>
      <me-button plain type="primary" icon="icon-minus-square">批量删除</me-button>
    </template>
    <template #action="{data}">
      <me-input v-model="data.label" />
    </template>
    <template #test>
      <me-button>test</me-button>
    </template>
  </me-table>
</template>
<script>
  export default {
    data() {
      return {
        columns: [
          { label:'编号', field: 'id'},
          { label:'测试', field: 'test' },
          { label:'操作', field: 'action' }
        ],
        data: [
          { id: '1', label: '陕西省sssss'},
          { id: '2', label: '四川省'},
          { id: '3', label: '江苏省'},
          { id: '2', label: '四川省'},
          { id: '3', label: '江苏省'},
          { id: '4', label: '河南省'},
          { id: '5', label: '陕西省'},
          { id: '6', label: '四川省'},
          { id: '7', label: '江苏省'},
          { id: '8', label: '河南省'},
          { id: '4', label: '河南省'}
        ]
      }
    },
    methods: {
      handlerData () {
        this.data.push(...this.data1)
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
  <div>
  <me-table ref="tableList" height="400px" checkbox multiple :data="data" :columns="columns" highlight>
    <template #header>
      <me-button plain type="primary" icon="icon-plus-square">新增</me-button>
      <me-button plain type="primary" @click="handlerTableSelectedData">获取选中表格数据</me-button>
      <me-button plain type="primary" @click="handlerData">变更数据</me-button>
      <me-button plain type="primary" icon="icon-minus-square">批量删除</me-button>
    </template>
    <template #action="{data}">
      <me-input v-model="data.label" />
    </template>
    <template #test>
      <me-button>test</me-button>
    </template>
  </me-table>
 
  </div>
</template>
<script>
  export default {
    data() {
      return {
        checkedRows:[],
        columns: [
          { label:'编号', field: 'id'},
          { label:'测试', field: 'test' },
          { label:'操作', field: 'action' }
        ],
        data: [
          { id: '1', label: '陕西省sssss'},
          { id: '2', label: '四川省'},
          { id: '3', label: '江苏省'},
          { id: '2', label: '四川省'},
          { id: '3', label: '江苏省'},
          { id: '4', label: '河南省'},
          { id: '5', label: '陕西省'},
          { id: '6', label: '四川省'},
          { id: '7', label: '江苏省'},
          { id: '8', label: '河南省'},
          { id: '4', label: '河南省'}
        ]
      }
    },
    methods: {
      handlerData () {
        this.data.push(...this.data1)
      },
      handlerTableSelectedData(){
        if(this.$refs.tableList){
          const result = this.$refs.tableList.getSelectedData()
          console.log('handlerTableSelectedData=========》', result)
        }
      }
    }
  }
</script>
```
:::
