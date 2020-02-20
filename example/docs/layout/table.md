# Table 表格

## 基础用法
::: demo `data` 数据 `border` 边框

```html
<template>
  <me-table :height="height + 'px'" checkbox multiple has-index :data="data" :columns="columns">
    <template #header>
      <me-button plain type="primary"  @click="height = height + 50"> + 50 </me-button>
      <me-button plain type="primary"  @click="height = height - 50"> - 50 </me-button>
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
        height: 400,
        columns: [
          { label:'编号', field: 'id'},
          { label:'测试', field: 'test' },
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
  <me-table ref="tableList" checkbox multiple :data="data" :columns="columns" highlight>
    <template #header>
      <me-button plain type="primary" icon="icon-plus-square">新增</me-button>
      <me-button plain type="primary" @click="getSelectedData">获取选中的数据</me-button>
      <me-button plain type="primary" @click="setSelected">设置选中</me-button>
      <me-button plain type="primary" @click="handlerData">变更数据</me-button>
      <me-button plain type="primary" @click="removeSelectData">批量删除</me-button>
    </template>
    <template #action="{data}">
      <me-button @click="removeRow(data)">删除</me-button>
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
        selectedData: [
          { id: '2', label: '四川省'},
          { id: '3', label: '江苏省'},
          { id: '4', label: '河南省'}
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
    },
    methods: {
      handlerData () {
        this.data.push(...this.data1)
      },
      setSelected () {
        this.$refs.tableList.setSelected(this.selectedData)
      },
      getSelectedData(){
        if(this.$refs.tableList){
          const result = this.$refs.tableList.getSelectedData()
          console.log('handlerTableSelectedData=========》', result)
        }
      },
      removeRow (data) {
        const tableList = this.$refs.tableList
        this.$dialog.confirm({
          content: '确定要删除当前行？',
          ok() {
            tableList.batchRemoveData([data])
          }
        })
      },
      removeSelectData(){
         const result = this.$refs.tableList.getSelectedData()
         if(this.$type.notArray(result) || result.length < 1 ) {
           this.$message.info('请选择要删除的数据！')
           return
         }
         this.$refs.tableList.batchRemoveData(result)
      }
    }
  }
</script>
```
:::
