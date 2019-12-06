<template>
  <me-combo ref="combo" v-bind="$props">
    <div class="me-column">
      <me-combo-option :data="item" :index="index" :key="item[fieldValue]" @click-option="onClickRow" v-for="(item,index) in data" />
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
    columns: { type: Array, default: () => [] },
  },
  watch: {
    value(value) { this.value__ = value }
  },
  created() {
    this.value__ = this.value
  },
  methods: {
    onClickRow(row, index) {
      this.$refs.combo.onClickOption(row, index)
      this.$emit('change', this.multiple ? [...this.value__] : this.value__)
    }
  }
}
</script>