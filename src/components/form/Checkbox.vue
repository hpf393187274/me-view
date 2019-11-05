<template>
  <label class="me-checkbox">
    <input :disabled="disabled" @click.stop="onClick" class="checkbox-inner" ref="checkbox" type="checkbox" v-model="value__" />
    <span v-if="label">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'MeCheckbox',
  model: {
    props: 'value', event: 'change'
  },
  data() {
    return {
      value__: this.value
    }
  },
  props: {
    checkedHalf: Boolean,
    disabled: Boolean,
    label: String,
    value: Boolean
  },
  computed: {
    styles() {
      return {}
    }
  },
  watch: {
    value(newValue) {
      this.value__ = newValue
    },
    value__(newValue) {
      console.log('watch', '->', 'onChange', newValue)
      this.$emit('change', newValue)
    },
    checkedHalf(newValue) {
      this.$refs.checkbox.indeterminate = newValue
    }
  },
  methods: {
    onClick(event) {
      const checked = event.target.checked
      this.$emit('click', checked)
    }
  }
}
</script>
