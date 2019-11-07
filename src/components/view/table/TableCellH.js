
import TableCell from './TableCell.mixin'
export default {
  name: 'MeTableCellH',
  mixins: [TableCell],
  render(h) {
    if (this.$slots.default) {
      // 渲染：普通默认插槽
      return h('th', { style: this.styles }, this.$slots.default)
    }
    return h('th',
      { style: this.styles },
      [
        h('div', {
          'class': 'cell-inner',
          attrs: {
            'title': this.label
          }
        }, [this.label])
      ]
    )
  }
}
