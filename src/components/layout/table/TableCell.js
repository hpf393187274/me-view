export default {
  name: 'MeTableCell',
  props: {
    columnStyle: { type: String, default: '' },
    field: { type: String, default: '' },
    editable: Boolean,
    sortable: Boolean,
    sortMethod: Function,
    sortBy: [String, Function, Array],
    resizable: Boolean, /** 可调整的 */
    width: String,
    formatter: Function, /** 格式化 */
    data: { type: Object, default: () => ({}) }
  },
  mounted() {
    this.owner && this.owner.columns__.push({
      ...this.$props,
      render: this.$scopedSlots.default || this.$slots.default
    })
  },
  render(h) { return h('div') },
  computed: {
    owner() {
      let parent = this.$parent;
      while (parent && parent.id__ && parent.id__.startsWith('me-table_') === false) {
        parent = parent.$parent
      }
      return this.$parent;
    }
  }
}
