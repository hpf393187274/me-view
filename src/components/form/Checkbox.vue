<template>
  <label :class="addClass('checkbox')">
    <input
      type="checkbox"
      ref="checkbox"
      v-model="currentValue"
      @click.stop="click(!currentValue)"
      @change="$emit('change')"
    >
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
    halfChecked: Boolean,
    value: Boolean
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
    currentValue(newValue) {
      this.$emit('input', newValue)
    },
    halfChecked(newValue) {
      this.$refs.checkbox.indeterminate = newValue
    }
  },
  methods: {
    click(value) {
      this.currentValue = value
      this.$emit('click', value)
    }
  }
}
</script>
