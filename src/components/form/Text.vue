<template>
  <div :class="addClass('text')">
    <label v-if="lable">{{ lable }}</label>
    <input type="text" v-model="currentValue" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  name: 'Text',
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
    }
  }
}
</script>
