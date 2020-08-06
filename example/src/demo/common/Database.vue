<template>
  <div>
    <div>
      <pre>{{target}}</pre>
    </div>
    <me-table ref="tableList" checkbox multiple :data="data" :columns="columns" highlight>
      <template #header>
        <me-button plain type="primary"  @click="height = height + 50"> + 50 </me-button>
        <me-button plain type="primary"  @click="height = height - 50"> - 50 </me-button>
        <me-button plain type="primary" @click="handlerAdd">新增</me-button>
        <me-button plain type="primary" @click="getCheckedRows">获取选中的数据</me-button>
        <me-button plain type="primary" @click="setCheckedRows">设置选中</me-button>
        <me-button plain type="primary" @click="handlerData">变更数据</me-button>
        <me-button plain type="primary" @click="handlerColumnAdd">增加列</me-button>
        <me-button plain type="primary" @click="handlerColumnRemove">减少列</me-button>
        <me-button plain type="primary" @click="removeSelectData">批量删除</me-button>
      </template>
      <template #action="{data}">
        <me-button @click="removeRow(data)">删除</me-button>
      </template>
      <template #test>
        <me-button>test</me-button>
      </template>
    </me-table>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      target: { name: '张三', sex: '男', age: 1 },
      height: 400,
      checkedRows: [],
      sourceColumns: [
        { label: '编号', field: 'id', sortable: true }
      ],
      columns: [
        { label: '编号', field: 'id', sortable: true }
      ],
      selectedData: [
        { id: '2', label: '四川省' },
        { id: '3', label: '江苏省' },
        { id: '4', label: '河南省' }
      ],
      data: [
        { id: '1', label: '陕西省1', name: 'aaa' },
        { id: '2', label: '四川省2' },
        // { id: '3', label: '江苏省3', name: 'ccc' },
        // { id: '4', label: '河南省4', name: 'ddd' },
        // { id: '5', label: '陕西省5', name: 'eee' },
        // { id: '6', label: '四川省6', name: 'fff' },
        // { id: '7', label: '江苏省7', name: 'ggg' },
        { id: '8', label: '河南省8', name: 'hhh' }
      ]
    }
  },
  created () {
    const location = this.$tools.urlLocation('http://sssf.cn:50/sfsfsfs/afsf/wrewr/?sfss=sfsw')
    console.log('222222222222222222222222', location)

    // this.$tools.assign(this.target, { name: '李四', age: 23 }, { sex: '女', phone: '15829669905' })

    const result = this.$tools.pathConvert('/NaMeSex/AGe/HeLloWord')

    console.log('11111111111111111111111111', result)
  },
  methods: {
    handlerColumnAdd () {
      this.columns.push({
        label: '名称',
        field: 'name',
        render (h, { data, field, label }) {
          return h('me-input', {
            props: { value: Reflect.get(data, field) },
            on: {
              change (value) { Vue.set(data, field, value) }
            }
          })
        }
      })

      this.columns.push({
        label: '性别',
        field: 'sex',
        render (h, { data, field, label }) {
          return h('me-input', {
            props: { value: Reflect.get(data, field) },
            on: {
              change (value) {
                Vue.set(data, field, value)
              }
            }
          })
        }
      })
    },
    handlerColumnRemove () {
      this.$tools.arrayRemove(this.columns, item => item.field === 'name')
    },
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
