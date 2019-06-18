<template>
  <div class="me-row me-input">
    <label :class="{'input-required': required}" class="me-row input-label" v-if="boolean(label)">{{ label }}：</label>
    <div :class="classWrap" :title="invalid.message" @mouseenter="active = true" @mouseleave="active = false">
      <input
        :disabled="disabled"
        :max="max"
        :min="min"
        :placeholder="placeholder"
        :readonly="readonly"
        :style="style"
        :type="type"
        class="me-flex input-inner"
        ref="target"
        v-model="currentValue"
      >
      <div class="input-icon me-row" ref="prefix" style="left:6px;">
        <slot name="prefix">
          <me-icon @click="$emit('handle-prefix', currentValue)" v-if="boolean(iconPrefix)">{{iconPrefix}}</me-icon>
        </slot>
      </div>
      <div class="input-icon me-row" ref="suffix" style="right:6px;">
        <me-icon @click="reset" v-if="clearable" v-show="active">{{$config.icon.clear}}</me-icon>
        <slot name="suffix">
          <me-icon @click="$emit('handle-suffix', currentValue)" v-if="boolean(iconSuffix)">{{iconSuffix}}</me-icon>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
const types = ['text', 'number', 'email']
export default {
  name: 'MeInput',
  data() {
    return {
      style: {
        'padding-left': '10px',
        'padding-right': '10px'
      },
      currentValue: this.value,
      initValue: this.value,
      showClear: false,
      active: false,
      message: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.style['padding-left'] = `${this.$refs.prefix.offsetWidth + 10}px`
      this.style['padding-right'] = `${this.$refs.suffix.offsetWidth + 10}px`
    })
  },
  computed: {
    paddingLeft() {
      let value = 10
      this.clearable === true && (value += 10)
      return value
    },
    paddingRight() {
      let value =
        this.clearable === true && (value += 10)
      return value
    },
    pattern__() {
      let value = this.pattern
      this.type === 'number' && (value = '[0-0]+')
      this.type === 'email' && (value = '^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$')
      return value
    },
    classWrap() {
      return [
        'me-row', 'me-flex', 'input-wrap',
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
    iconPrefix: String,
    iconSuffix: String,
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
