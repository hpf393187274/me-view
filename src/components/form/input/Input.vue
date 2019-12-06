<template>
  <div :class="classes">
    <input
      :disabled="disabled"
      :max="max"
      :min="min"
      :placeholder="placeholder"
      :readonly="readonly"
      :style="styles"
      :type="type"
      @blur="$emit('blur-input', value__)"
      @click.stop="$emit('click-input', value__)"
      @focus="$emit('focus-input', value__)"
      class="me-flex input-inner"
      ref="target"
      v-model.trim.lazy="value__"
    />
    <div class="me-row input-icon" ref="prefix" style="left: 5px;" v-if="boolean(iconPrefix) || $slots.prefix">
      <slot name="prefix">
        <me-icon :disabled="disabled" @click="onClickPrefix" v-if="boolean(iconPrefix)">{{iconPrefix}}</me-icon>
      </slot>
    </div>

    <div class="me-row input-icon" ref="suffix" style="right: 5px;" v-if="showClear || boolean(iconSuffix) || $slots.suffix">
      <me-icon :disabled="disabled" @click="onReset" v-if="showClear">{{$config.icon.clear}}</me-icon>
      <slot name="suffix">
        <me-icon :disabled="disabled" @click="onClickSuffix" v-if="boolean(iconSuffix)">{{iconSuffix}}</me-icon>
      </slot>
    </div>
  </div>
</template>

<script>
const types = ['text', 'number', 'email', 'password']
export default {
  name: 'MeInput',
  model: {
    props: 'value', event: 'change'
  },
  props: {
    required: Boolean,
    disabled: Boolean,
    type: { type: String, default: 'text', validator: value => types.includes(value) },
    value: { type: [Number, String, Array], default: '' },
    min: Number,
    max: { type: Number, default: 1000000 },
    minLength: Number,
    maxLength: Number,
    iconPrefix: String,
    iconSuffix: String,
    placeholder: String,
    pattern: String,
    readonly: Boolean
  },
  data() {
    return {
      left: 8,
      right: 8,
      value__: '',
      valueReset: '',
      active: false,
      message: ''
    }
  },
  created() {
    this.initValue(this.value)
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.prefix && (this.left += this.$refs.prefix.offsetWidth)
      this.$refs.suffix && (this.right += this.$refs.suffix.offsetWidth)

      this.$on('focus-input', this.onFocusInput)
    })
  },
  computed: {
    showClear() {
      return this.disabled === false && this.clearable
    },
    classes() {
      return [
        'me-row me-flex me-input',
        {
          'me-readonly': this.readonly,
          'me-disabled': this.disabled
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
      return this.clearable ? 20 : 10
    },
    paddingRight() {
      return this.clearable ? 10 : 0
    },
    pattern__() {
      let value = this.pattern
      this.type === 'number' && (value = '[0-0]+')
      this.type === 'email' && (value = '^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$')
      return value
    }
  },
  watch: {
    value(newValue) {
      this.value__ = newValue
    },
    value__(newValue, oldValue) {
      if (this.$refs.target.checkValidity() === false) {
        this.value__ = oldValue
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
      this.$emit('change', this.type === 'number' ? Number(value) : value)
    },
    initValue(value) {
      if (this.$type.isObject(value)) {
        this.value__ = { ...value }
        this.valueReset = { ...value }
      } else if (this.$type.isArray(value)) {
        this.value__ = [...value]
        this.valueReset = [...value]
      } else {
        this.value__ = value
        this.valueReset = value
      }
    },
    /**
     * 重置
     */
    onReset() {
      this.value__ = this.$tools.clone(this.valueReset, true)
    },
    onFocusInput() {
      this.$refs.target.focus()
    },
    onClickInput() {
      this.$emit('click-input-before', this.value__)
      this.$emit('click-input', this.value__)
      this.$emit('click-input-after', this.value__)
    },
    onClickPrefix() {
      this.$emit('click-prefix-before', this.value__)
      this.$emit('click-prefix', this.value__)
      this.$emit('click-prefix-after', this.value__)
    },
    onClickSuffix() {
      this.$emit('click-suffix-before', this.value__)
      this.$emit('click-suffix', this.value__)
      this.$emit('click-suffix-after', this.value__)
    },
    onMouseenter() {
      if (this.disabled) { return }
      this.active = true
    },
    onMouseleave() {
      if (this.disabled) { return }
      this.active = false
    }
  }
}
</script>
