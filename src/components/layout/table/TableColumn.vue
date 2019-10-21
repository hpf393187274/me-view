<template>
  <div :class="classes" :style="styles">
    <me-table-custom :data="data" :render="render" v-if="render" />
    <template v-else>
      <slot :data="data">
        <span :title="fieldValue" class="table-column-inner">{{fieldValue}}</span>
      </slot>
    </template>
  </div>
</template>
<script>
import CellCustom from './CellCustom'
let idSeed = 1
export default {
  name: 'MeTableColumn',
  components: {
    [CellCustom.name]: CellCustom
  },
  props: {
    columnStyle: { type: String, default: '' },
    field: { type: String, default: '' },
    editable: Boolean,
    sortable: Boolean,
    sortMethod: Function,
    render: Function,
    renderType: {
      type: String, default: 'normal',
      validator: value => {
        return ['index', 'checkbox', 'html', 'edit', 'custom', 'slot', 'normal'].includes(value)
      }
    },
    sortBy: [String, Function, Array],
    resizable: Boolean, /** 可调整的 */
    width: String,
    formatter: Function, /** 格式化 */
    data: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      id__: null
    }
  },
  created() {
    this.id__ = `me-table-column_${idSeed++}`
  },
  computed: {
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
        'width': this.width ? '40px' : 'auto'
      }
    }
  }
}
</script>
