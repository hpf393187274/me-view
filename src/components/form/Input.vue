<template>
  <div class="me-row me-text">
    <label class="me-row" v-if="label">{{ label }}</label>
    <input
      :disabled="disabled"
      :max="max"
      :min="min"
      :pattern="pattern"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
      :type="type"
      ref="target"
      v-model="currentValue"
    >
  </div>
</template>

<script>
const types = ['text', 'number', 'email']
export default {
  name: 'MeInput',
  data() {
    return {
      currentValue: this.value,
      pattern__: '',
    }
  },
  created() {
    this.type === 'number' && (this.pattern__ = '[0-0]+')
    this.type === 'email' && (this.pattern__ = '^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$')
  },
  props: {
    placeholder: { type: String, default: '' },
    required: { type: Boolean },
    readonly: { type: Boolean },
    type: { type: String, default: 'text', validator: value => types.includes(value) },
    value: { type: [Number, String], default: '' },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    pattern: { type: String }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
    currentValue(newValue, oldValue) {
      if (this.$refs.target.checkValidity() === false) {
        this.currentValue = oldValue
        return
      }
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    }
  }
}
</script>
