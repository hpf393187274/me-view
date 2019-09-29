<template>
  <div :class="classes" :title="invalid.message" @mouseenter="disabled === false && (active = true)" @mouseleave="active = false">
    <input
      :disabled="disabled"
      :max="max"
      :min="min"
      :placeholder="placeholder"
      :readonly="readonly"
      :style="styles"
      :type="type"
      @blur="blurInput"
      @click="clickInput"
      class="me-flex input-inner"
      ref="target"
      v-model="currentValue"
    />
    <div class="me-row input-icon" ref="prefix" style="left: 5px;">
      <slot name="prefix">
        <me-icon :disabled="disabled" @click="clickPrefix" v-if="boolean(iconPrefix)">{{iconPrefix}}</me-icon>
      </slot>
    </div>
    <div class="me-row input-icon" ref="suffix" style="right: 5px;">
      <me-icon :disabled="disabled" @click="reset" v-if="clearable" v-show="active">{{$config.icon.clear}}</me-icon>
      <slot name="suffix">
        <me-icon :disabled="disabled" @click="clickSuffix" v-if="boolean(iconSuffix)">{{iconSuffix}}</me-icon>
      </slot>
    </div>
  </div>
</template>

<script>
const types = ['text', 'number', 'email', 'password']
export default {
  name: 'MeInput',
  props: {
    readonly: Boolean
  },
  data() {
    return {
      left: 8,
      right: 8,
      currentValue: '',
      resetValue: '',
      active: false,
      message: ''
    }
  },
  created() {
    this.initValue(this.value)
  },
  mounted() {
    this.$nextTick(() => {
      this.left += this.$refs.prefix.offsetWidth
      this.right += this.$refs.suffix.offsetWidth
    })
  },
  computed: {
    classes() {
      return [
        'me-row me-input',
        {
          'me-readonly': this.readonly,
          'me-disabled': this.disabled,
          'input-invalid': this.invalid.status
        },
      ]
    },
    styles() {
      return {
        'padding-left': `${this.left}px`,
        'padding-right': `${this.right}px`
      }
    },
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

    invalid() {
      if (this.required && this.$tools.isEmpty(this.currentValue)) {
        return { status: true, message: '内容不能为空' }
      }
      return { status: false }
    }
  },
  props: {
    required: { type: Boolean },
    type: { type: String, default: 'text', validator: value => types.includes(value) },
    value: { type: [Number, String, Array], default: '' },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 1000000 },
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
      this.updateValue(newValue)
    },
    change(value) {
      this.updateValue(value)
    }
  },
  methods: {
    updateValue(value) {
      // if (this.$type.isArray(this.value)) {
      //   return
      // }
      const newValue = this.convertValue(value)
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    },
    convertValue(value) {
      if (this.type === 'number') {
        return Number(value)
      }
      return this.$type.isArray(this.value) ? value : value.split(',')
    },
    initValue(value) {
      if (this.$type.isObject(value)) {
        this.currentValue = { ...value }
        this.resetValue = { ...value }
      } else if (this.$type.isArray(value)) {
        this.currentValue = [...value]
        this.resetValue = [...value]
      } else {
        this.currentValue = value
        this.resetValue = value
      }
    },
    /**
     * 重置
     */
    reset() {
      this.currentValue = this.resetValue
    },
    clickInput() {
      this.$emit('click-input-before', this.currentValue)
      this.$emit('click-input', this.currentValue)
      this.$emit('click-input-after', this.currentValue)
    },
    clickPrefix() {
      this.$emit('click-prefix-before', this.currentValue)
      this.$emit('click-prefix', this.currentValue)
      this.$emit('click-prefix-after', this.currentValue)
    },
    focus() {
      this.$refs.target.focus()
    },
    clickSuffix() {
      this.$emit('click-suffix-before', this.currentValue)
      this.$emit('click-suffix', this.currentValue)
      this.$emit('click-suffix-after', this.currentValue)
    },
    blurInput() {
      this.$emit('blur-input-before', this.currentValue)
      this.$emit('blur-input', this.currentValue)
      this.$emit('blur-input-after', this.currentValue)
    }
  }
}
</script>
