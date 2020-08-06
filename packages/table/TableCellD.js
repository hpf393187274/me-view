
import TableCell from './TableCell.mixin'
import Type from 'me-view/src/script/type'
let idSeed = 1
export default {
  name: 'MeTableCellD',
  mixins: [ TableCell ],
  props: {
    data: { type: Object, default: () => ({}) },
    render: Function
  },
  created () {
    this.index__ = idSeed++
    this.id__ = `me-table-column_${this.index__}`
  },
  render (h) {
    if (this.$slots.default) {
      // 渲染：普通默认插槽
      return this.renderRoot(h, this.$slots.default)
    }
    const params = {
      data: this.data,
      field: this.field,
      label: this.label,
      fieldValue: this.fieldValue,
      indexRow: this.indexRow,
      indexCell: this.indexCell
    }
    // 渲染 extended
    if (Type.isFunction(this.extended)) {
      return this.renderRoot(h, [
        this.extended(params)
      ])
    }

    if (Type.isFunction(this.render)) {
      return this.renderRoot(h, [ this.render(h, params) ].flat())
    }

    return this.renderRoot(h, h('span', { class: 'cell-inner' }, [ this.fieldValue ]))
  },
  computed: {
    fieldValue () {
      return Reflect.get(this.data, this.field)
    }
  },
  methods: {
    handlerClick () {
      this.$copy(this.$el.querySelector('.table-cell'), {
        prompt: this.clipboardPrompt,
        message: this.clipboardMessage
      })
    },
    renderRoot (h, children) {
      const attrs = { title: this.fieldValue }
      if (this.clipboard === true) {
        Reflect.set(attrs, 'data-clipboard-text', this.fieldValue)
      }
      return h('td', { style: this.styles }, [
        h('div', {
          class: [
            'table-cell me-row me-cross-center',
            `me-main-${this.layout}`
          ],
          attrs,
          on: {
            click: this.handlerClick
          }
        }, [ ...[ children ].flat() ])
      ])
    }
  }
}
