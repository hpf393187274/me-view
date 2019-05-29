<template>
  <div class="me-row me-text">
    <label class="me-row" v-if="label">{{ label }}</label>
    <input :placeholder="placeholder" type="text" v-model="currentValue">
  </div>
</template>

<script>
export default {
  name: 'MeNumber',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    placeholder: { type: String, default: '' },
    value: { type: String, default: '' }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
    currentValue(newValue) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    }
  }
}
</script>
