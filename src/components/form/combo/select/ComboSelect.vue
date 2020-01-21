<template>
  <me-combo ref="combo" v-bind="$props" v-model="value__">
    <div class="me-column">
      <me-combo-option :data="item" :index="index" :key="item[fieldValue]" @click-option="handlerSelect" v-for="(item,index) in data" />
    </div>
  </me-combo>
</template>

<script>
import ComboMixin from '../combo.mixin'
import ComboBaseMixin from '../comboBase.mixin'
import Option from './Option'
import Combo from '../Combo'
export default {
  components: { [Combo.name]: Combo, [Option.name]: Option },
  mixins: [ComboMixin, ComboBaseMixin],
  name: 'MeComboSelect',
  props: {
    columns: { type: Array, default: () => [] }
  },
  watch: {
    value (value) { this.value__ = value }
  },
  created () {
    this.value__ = this.value
  },
  methods: {
    handlerSelect (row, index) {
      this.$emit('on-select', row, index)
      this.$emit('change', this.multiple ? [...this.value__] : this.value__)
    }
  }
}
</script>
