<template>
  <me-table ref="tableList" primary-field ="id" checkbox multiple :data="data" :columns="columns" highlight>
    <template #header>
      <me-button plain type="primary"  @click="height = height + 50"> + 50 </me-button>
      <me-button plain type="primary"  @click="height = height - 50"> - 50 </me-button>
      <me-button plain type="primary" @click="handlerAdd">新增</me-button>
      <me-button plain type="primary" @click="getCheckedRows">获取选中的数据</me-button>
      <me-button plain type="primary" @click="setCheckedRows">设置选中</me-button>
      <me-button plain type="primary" @click="handlerData">变更数据</me-button>
      <me-button plain type="primary" @click="removeSelectData">批量删除</me-button>
      {{checkedRows}}
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
  data () {
    return {
      height: 400,
      checkedRows: [],
      columns: [
        { label: '编号', field: 'id', sortable: true },
        { label: '测试', field: 'test' },
        { label: '操作', field: 'action' }
      ],
      selectedData: [
        { id: '2', label: '四川省' },
        { id: '3', label: '江苏省' },
        { id: '4', label: '河南省' }
      ],
      data: [
        { id: '1', label: '陕西省1' },
        { id: '2', label: '四川省2' },
        { id: '3', label: '江苏省3' },
        { id: '4', label: '河南省4' },
        { id: '5', label: '陕西省5' },
        { id: '6', label: '四川省6' },
        { id: '7', label: '江苏省7' },
        { id: '8', label: '河南省8' }
      ]
    }
  },
  methods: {
    handlerAdd () {
      const uuid = this.$tools.UUId()
      this.data.push({ id: uuid, label: `新增的-${uuid}` })

      // this.$refs.tableList.appendRow({ id: uuid, label: `新增的-${uuid}` })
    },
    handlerData () {
      this.data.push(...this.selectedData)
    },
    setCheckedRows () {
      this.$refs.tableList.setCheckedRows(this.selectedData)
    },
    getCheckedRows () {
      const result = this.$refs.tableList.getCheckedRows()
      this.checkedRows = [...result]
      console.debug('table.getCheckedRows -->', result)
    },
    async removeRow (data) {
      await this.$dialog.confirm('确定要删除当前行？')
      this.$refs.tableList.removeRows([data])
    },
    removeSelectData () {
      const result = this.$refs.tableList.getCheckedRows()
      if (this.$type.notArray(result) || result.length < 1) {
        this.$message.info('请选择要删除的数据！')
        return
      }
      this.$refs.tableList.removeRows(result)
    }
  }
}
</script>
