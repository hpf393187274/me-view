<template>
  <label :class="addClass('checkbox')" style="margin-right:10px" @click="$emit('click')">
    <input type="checkbox" ref="checkbox" v-model="currentValue" @change="$emit('change')">
    <span v-if="lable">{{ lable }}</span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    lable: { type: String, default: '' },
    indeterminate: Boolean,
    value: Boolean
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
    currentValue(newValue) {
      this.$emit('input', newValue)
    },
    indeterminate(newValue) {
      this.$refs.checkbox.indeterminate = newValue
    }
  }
}
</script>
