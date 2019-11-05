
import TableCell from './TableCell.mixin'
let idSeed = 1
export default {
  name: 'MeTableCellD',
  mixins: [TableCell],
  props: {
    data: { type: Object, default: () => ({}) },
    render: Function
  },
  created() {
    this.index__ = idSeed++
    this.id__ = `me-table-column_${this.index__}`
  },
  render(h) {
    if (this.$slots.default) {
      // 渲染：普通默认插槽
      return this.renderRoot(h, this.$slots.default)
    }
    const params = {
      data: this.data, value: this.fieldValue,
      indexRow: this.indexRow, indexCell: this.indexCell
    }
    // 渲染 extended
    if (this.$type.isFunction(this.extended)) {
      return this.renderRoot(h, [
        this.extended(params)
      ])
    }

    if (this.$type.isFunction(this.render)) {
      return this.renderRoot(h, [
        this.render(h, params)
      ])
    }

    return this.renderRoot(h, [
      h('div', {
        'class': 'cell-inner',
        attr: {
          'title': this.fieldValue
        },
      }, this.fieldValue)
    ])
  },
  computed: {
    fieldValue() {
      return Reflect.get(this.data, this.field)
    }
  },
  methods: {
    renderRoot(h, children) {
      return h('td', {
        style: this.styles
      }, children)
    }
  }
}
