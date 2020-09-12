<template>
  <div>
    <pre>{{checkList}}</pre>
    <div class="me-row">
      <me-button @click="handlerClearCheck">撤销选中</me-button>
      <me-input v-model="key" />
      <me-button @click="handlerChecked">选中/取消</me-button>
      <me-button @click="handlerCheckedData">选中数据</me-button>
      <me-button @click="handlerCheckedRemove">移出选中的数据</me-button>
    </div>
    <me-tree
      expandedAll
      ref="tree"
      highlight
      action
      :data="data"
      checkbox
      statistics
      header
      header-label="全选">
    </me-tree>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: '1-1',
      status: false,
      checkList: [],
      data: [
        {
          code: '1',
          label: '陕西省',
          children: [
            {
              code: '1-1',
              label: '西安市',
              children: [
                { code: '1-1-1', label: '雁塔区' },
                { code: '1-1-2', label: '长安区' }
              ]
            }
          ]
        },
        {
          code: '2',
          label: '四川省',
          children: [
            { code: '2-1', label: '成都市' },
            { code: '2-2', label: '汶川市' }
          ]
        }
      ]
    }
  },
  methods: {
    handlerClearCheck () {
      this.$refs.tree.clearChecked()
    },
    handlerChecked () {
      this.status = !this.status
      this.$refs.tree.setChecked(this.key, this.status, true)
    },
    handlerCheckedData () {
      const data = this.$refs.tree.getCheckedData({ checked: true })
      this.checkList = [...data]
      console.log('handlerCheckedData -> ', data)
    },
    handlerCheckedRemove () {
      this.$refs.tree.removeCheckedNode()
    }
  }
}
</script>
