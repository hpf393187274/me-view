<template>
  <div class="me-row me-text">
    <label class="me-row" v-if="label">{{ label }}</label>
    <input :placeholder="placeholder" type="text" v-model="currentValue">
  </div>
</template>

<script>
import { type } from '@assets/script/common'
export default {
  name: 'MeNumber',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    placeholder: { type: String, default: '' },
    value: { type: Number, default: 0, validator: value => type.isNumber(value) },
    valueMin: { type: Number, default: 0, validator: value => type.isNumber(value) },
    valueMax: { type: Number, default: 0, validator: value => type.isNumber(value) }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
    currentValue(newValue, oldValue) {
      const temp = Number.parseFloat(newValue)
      if (this.$type.isNotNumber(temp) || temp < this.valueMin || temp > this.valueMax) {
        this.currentValue = oldValue;
        return
      }
      this.$emit('input', temp)
      this.$emit('change', temp)
    }
  }
}
</script>
