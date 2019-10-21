
export default {
  name: 'MeTableCustom',
  props: {
    render: Function,
    indexRow: Number,
    indexCell: Number,
    data: { type: Object, default: () => ({}) }
  },
  render() {
    return this.render({
      data: this.data, indexRow: this.indexRow, indexCell: this.indexCell
    })
  }
}