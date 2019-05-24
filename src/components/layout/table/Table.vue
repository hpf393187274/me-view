<template>
  <div class="me-column me-table">
    <me-table-header :columns="columns"/>
    <me-table-body :node-key="nodeKey" :data="data" :columns="columns"/>
  </div>
</template>
<script>
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
export default {
  name: 'MeTable',
  components: {
    [TableHeader.name]: TableHeader,
    [TableBody.name]: TableBody
  },
  props: {
    checkbox: Boolean,
    nodeKey: { type: String, default: 'id' },
    field: { type: String, default: '' },
    data: { type: Array, default: () => [] }
  },
  data() {
    return {
      columns: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.columns = this.parseColumns()
    })
  },
  methods: {
    getColumns() {
      if (this.$type.isNotArray(this.$slots.default)) { return [] }
      return this.$slots.default.filter(vnode => {
        return vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'MeTableColumn'
      })

    },
    parseColumns() {
      return this.getColumns().flatMap(vnode => {
        return vnode.componentOptions.propsData
      })
    }
  }
}
</script>
