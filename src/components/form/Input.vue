<template>
  <div class="me-row me-input">
    {{pattern}}
    <label :class="{'input-required': required}" class="me-row input-label" v-if="boolean(label)">{{ label }}：</label>
    <div :class="classWrap" :title="invalid.message" @mouseenter="active = true" @mouseleave="active = false">
      <input
        :disabled="disabled"
        :max="max"
        :min="min"
        :placeholder="placeholder"
        :readonly="readonly"
        :type="type"
        class="me-flex input-inner"
        ref="target"
        v-model="currentValue"
      >
      <me-icon @click="$emit('icon-handle', currentValue)" v-if="boolean(icon)">{{icon}}</me-icon>
      <me-icon
        :style="{'visibility': active ? 'visible' : 'hidden'}"
        @click="reset"
        style="cursor: pointer;"
        v-if="clearable"
        v-show="active "
      >{{$config.icon.clear}}</me-icon>
    </div>
  </div>
</template>

<script>
const types = ['text', 'number', 'email']
export default {
  name: 'MeInput',
  data() {
    return {
      currentValue: this.value,
      initValue: this.value,
      showClear: false,
      active: false,
      message: ''
    }
  },
  computed: {
    pattern__() {
      let value = this.pattern
      this.type === 'number' && (value = '[0-0]+')
      this.type === 'email' && (value = '^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$')
      return value
    },
    classWrap() {
      return [
        'me-row', 'me-flex', 'me-border', 'input-wrap',
        { 'input-invalid': this.invalid.status }
      ]
    },
    invalid() {
      if (this.required && this.$tools.isEmpty(this.currentValue)) {
        return { status: true, message: '内容不能为空' }
      }
      return { status: false }
    }
  },
  props: {
    placeholder: { type: String, default: '' },
    clearable: { type: Boolean },
    required: { type: Boolean },
    readonly: { type: Boolean },
    type: { type: String, default: 'text', validator: value => types.includes(value) },
    value: { type: [Number, String], default: '' },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 1000 },
    minLength: { type: Number, default: 0 },
    maxLength: { type: Number, default: 0 },
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
  },
  methods: {
    /**
     * 重置
     */
    reset() { this.currentValue = this.initValue }
  }
}
</script>
