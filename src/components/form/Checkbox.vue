<template>
  <label class="me-checkbox">
    <input :disabled="disabled" @change="onChange" @click="onClick" class="checkbox-inner" ref="checkbox" type="checkbox" v-model="value__" />
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
    checkedHalf(newValue) {
      this.$refs.checkbox.indeterminate = newValue
    }
  },
  methods: {
    onChange(event) {
      const checked = event.target.checked
      this.$emit('change', checked)
    },
    onClick(event) {
      const checked = event.target.checked
      this.$emit('click-checkbox', checked)
    }
  }
}
</script>
