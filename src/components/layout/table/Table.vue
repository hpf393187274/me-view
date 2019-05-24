<template>
  <div class="me-column me-table">
    <div class="table-header">header</div>
    <div class="table-body">body</div>
    <me-button @click="parseColumns">getColumns</me-button>
  </div>
</template>
<script>
export default {
  name: 'MeTable',
  props: {
    checkbox: Boolean,
    field: { type: String, default: '' },
    data: { type: Array, default: () => [] }
  },
  methods: {
    getColumns() {
      if (this.$type.isNotArray(this.$slots.default)) { return [] }
      return this.$slots.default.filter(vnode => {
        return vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.name === 'MeTableColumn'
      })

    },
    parseColumns() {
      this.getColumns().flatMap((vnode) => {
        return vnode.componentInstance
      })
    }

  }
}
</script>
