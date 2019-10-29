let idSeed = 1
export default {
  name: 'MeTableCell',
  props: {
    columnStyle: { type: String, default: '' },
    header: Boolean,
    field: { type: String, default: '' },
    editable: Boolean,
    sortable: Boolean,
    sortMethod: Function,
    sortBy: [String, Function, Array],
    resizable: Boolean, /** 可调整的 */
    width: String,
    formatter: Function, /** 格式化 */
    render: Function,
    data: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      id__: null,
      index: 1,
    }
  },
  created() {
    this.index = idSeed++
    this.id__ = `me-table-column_${this.index}`
  },
  mounted() {
    this.$nextTick(() => {
      if (this.owner) {
        // debugger
        this.owner.columns__.push({
          ...this.$props,
          render: this.$scopedSlots.default || this.$slots.default
        })
      }
    })
  },

  render(h) {
    if (this.render) {
      // 渲染：自定义 -> 作用域默认插槽
      if (this.$type.isFunction(this.render)) {
        return this.renderRoot(h, [
          this.render({
            data: this.data, indexRow: this.indexRow, indexCell: this.indexCell
          })
        ])
      }
      // 渲染：自定义 -> 普通默认插槽
      return this.renderRoot(h, [this.render])
    }

    if (this.$slots.default) {
      // 渲染：普通默认插槽
      return this.renderRoot(h, this.$slots.default)
    }

    if (this.$tools.isEmpty(this.fieldValue)) {
      return this.renderRoot(h)
    }
    return this.renderRoot(h, [
      h('div', {
        'class': 'table-column-inner',
        'title': this.fieldValue
      }, this.fieldValue)
    ])
  },
  computed: {
    owner() {
      let parent = this.$parent;
      if (parent.id__ && parent.id__.startsWith('me-table_')) {
        return parent
      }
      return null
    },
    fieldValue() {
      return Reflect.get(this.data, this.field)
    },
    classes() {
      return [
        'me-row table-column',
        {
          'me-flex': this.$tools.isEmpty(this.width),
          'me-center': this.center
        }
      ]
    },
    styles() {
      return {
        'width': this.width
      }
    }
  },
  methods: {
    renderRoot(h, children) {
      return h('div', {
        'class': this.classes,
        'style': this.styles
      }, children)
    },
  }
}
